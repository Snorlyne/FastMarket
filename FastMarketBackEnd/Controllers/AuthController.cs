using Domain.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Services.IServices;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FastMarketBackEnd.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUsuariosServices _usuariosServices;

        public AuthController(IConfiguration configuration, IUsuariosServices usuariosServices)
        {
            _configuration = configuration;
            _usuariosServices = usuariosServices;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UsuarioLoginDto usuarioLogin)
        {
            // Verifica las credenciales del usuario
            var usuario = await _usuariosServices.ValidarUsuario(usuarioLogin.Correo, usuarioLogin.Contraseña);
            if (usuario == null)
            {
                return Unauthorized();
            }

            // Obtener el rol del usuario usando el ID de rol
            var rolNombre = await _usuariosServices.ObtenerNombreRolPorId(usuario.IdRol); // Método que debes implementar en el servicio

            // Verifica que el rol exista
            if (string.IsNullOrEmpty(rolNombre))
            {
                return Unauthorized();
            }

            // Generar el token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
                    new Claim(ClaimTypes.Email, usuario.Correo),
                    new Claim(ClaimTypes.Role, rolNombre) // Agregar el rol al token
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return Ok(new { Token = tokenHandler.WriteToken(token) });
        }
    }
}
