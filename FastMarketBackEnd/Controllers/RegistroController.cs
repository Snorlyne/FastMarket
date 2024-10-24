using Domain.Dto;
using Microsoft.AspNetCore.Mvc;
using Services.IServices;
using System.Threading.Tasks;

namespace FastMarketBackEnd.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RegistroController : ControllerBase
    {
        private readonly IRegistroServices _registroServices;

        public RegistroController(IRegistroServices registroServices)
        {
            _registroServices = registroServices;
        }

        [HttpPost]
        public async Task<IActionResult> RegistrarUsuario([FromBody] RegistroDto registroDto)
        {
            // Llamar al servicio para registrar el usuario y la persona
            try
            {
                var res = await _registroServices.RegistrarUsuarioYPersona(registroDto);
                return Ok(res);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
