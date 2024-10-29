using Domain.Dto;
using FastMarketBackEnd.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.IServices;

namespace FastMarketBackEnd.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AnunciosController : ControllerBase
    {
        private readonly IAnunciosServices _anunciosServices;
        public AnunciosController(IAnunciosServices anunciosServices)
        {
            _anunciosServices = anunciosServices;
        }
        // GET: api/<AnunciosController>
        [HttpGet] 
        public async Task<IActionResult> Get()
        {
            var response = await _anunciosServices.ObtenerAnuncios();
            return Ok(response);
        }
        // GET api/<AnunciosController>
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var response = await _anunciosServices.ObtenerAnuncio(id);
            return Ok(response);
        }
        // POST api/<AnunciosController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] AnunciosDto request)
        {
            try
            {
                // Usar el helper para obtener el IdPersona del token
                int idPersona = TokenHelper.ObtenerIdPersona(User);

                // Llamar al servicio para crear el anuncio
                var response = await _anunciosServices.CrearAnuncio(request, idPersona);
                return Ok(response);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
        }

        // PUT api/<AnunciosController>
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] AnunciosDto request)
        {
            var response = await _anunciosServices.ActualizarAnuncio(id, request);
            return Ok(response);
        }

        // DELETE api/<AnunciosController>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var response = await _anunciosServices.EliminarAnuncio(id);
            return Ok(response);
        }
    }
}
