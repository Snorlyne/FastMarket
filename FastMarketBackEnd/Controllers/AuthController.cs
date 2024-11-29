using Domain.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Repository.Context;
using Services.IServices;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Serilog;
using System.Text.RegularExpressions;
namespace FastMarketBackEnd.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUsuariosServices _usuariosServices;
        private readonly ApplicationDBContext _dbContext;

        public AuthController(ApplicationDBContext dBContext, IConfiguration configuration, IUsuariosServices usuariosServices)
        {
            _configuration = configuration;
            _usuariosServices = usuariosServices;
            _dbContext = dBContext;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UsuarioLoginDto usuarioLogin)
        {
            Log.Information("Intento de inicio de sesión para el usuario con correo: "+ usuarioLogin.Correo);


            if (!EsCorreoValido(usuarioLogin.Correo))
            {
                Log.Error("El correo proporcionado tiene un formato inválido: " + usuarioLogin.Correo);
                return BadRequest("El formato del correo electrónico es inválido.");
            }

            // Verifica las credenciales del usuario
            var usuario = await _usuariosServices.ValidarUsuario(usuarioLogin.Correo, usuarioLogin.Contraseña);

            if (usuario == null)
            {

                return Unauthorized("Credenciales incorrectas");
            }

            // Obtener el rol del usuario usando el ID de rol
            var rolNombre = await _usuariosServices.ObtenerNombreRolPorId(usuario.IdRol);
            if (string.IsNullOrEmpty(rolNombre))
            {
                return Unauthorized("El rol no existe");
            }

            // Aseguramos que el IdPersona está disponible
            var persona = await _dbContext.personas.FirstOrDefaultAsync(x => x.IdUsuario == usuario.Id)
                 ?? throw new Exception("Error al obtener usuario.");

            // Generar el token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                   new Claim("IdPersona", persona.Id.ToString()),      // Incluir persona
                    new Claim(ClaimTypes.Email, usuario.Correo),       // Incluir el correo
                    new Claim(ClaimTypes.Role, rolNombre)              // Incluir el rol
                }),
                Expires = DateTime.UtcNow.AddHours(12),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);

            Log.Information("Inicio de sesión para el usuario con ID: " + usuario.Id);

            return Ok(new { Token = jwtToken, persona.Id });
        }

        private bool EsCorreoValido(string correo)
        {
            if (string.IsNullOrWhiteSpace(correo))
            {
                return false;
            }

            // Expresión regular para validar correo electrónico
            var regex = new Regex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$");
            return regex.IsMatch(correo);
        }
    }
}
