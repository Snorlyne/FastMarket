using Domain.Dto;
using Microsoft.AspNetCore.Mvc;
using Services.IServices;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FastMarketBackEnd.Controllers
{
    [Route("[controller]")]
    [ApiController]
    
    public class UsuariosController : ControllerBase
    {
        private readonly IUsuariosServices _services;

        public UsuariosController(IUsuariosServices services)
        {
            _services = services;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<UsuariosDto>>> GetUsuarios()
        {
            var usuarios = await _services.ObtenerUsuarios();
            return Ok(usuarios);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UsuariosDto>> GetUsuario(int id)
        {
            var usuario = await _services.ObtenerUsuarioPorId(id);
            if (usuario == null)
            {
                return NotFound();
            }
            return Ok(usuario);
        }

        [HttpPost]
        public async Task<IActionResult> PostUsuario([FromBody] UsuarioCreateDto usuarioDto)
        {
            var usuarioCreado = await _services.CrearUsuario(usuarioDto);
            return CreatedAtAction(nameof(GetUsuario), new { id = usuarioCreado.Result.Id }, usuarioCreado);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuario(int id, [FromBody] UsuariosDto usuarioDto)
        {
            var actualizado = await _services.ActualizarUsuario(id, usuarioDto);
            if (!actualizado)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuario(int id)
        {
            var eliminado = await _services.EliminarUsuario(id);
            if (!eliminado)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
