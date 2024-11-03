using Domain.Dto;
using FastMarketBackEnd.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.IServices;
using Services.Services;

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
            int idPersona = TokenHelper.ObtenerIdPersona(User);
            var response = await _anunciosServices.ObtenerAnuncio(id, idPersona);
            return Ok(response);
        }
        // GET: api/<AnunciosUsuarioController>
        [HttpGet("byToken")]
        [Authorize]
        public async Task<IActionResult> GetAnunciosPorUsuario()
        {
            try
            {
                int idPersona = TokenHelper.ObtenerIdPersona(User);
                var response = await _anunciosServices.ObtenerAnunciosUsuario(idPersona);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest("Ocurrió un error al obtener los anuncios: " + ex.Message);
            }
        }
        [HttpGet("filtrar")]
        public async Task<IActionResult> ObtenerAnunciosFiltrados(
        [FromQuery] string? nombreProducto = null,
        [FromQuery] string? etiquetas = null,
        [FromQuery] string? ciudad = null,
        [FromQuery] string? estado = null,
        [FromQuery] string? pais = null,
        [FromQuery] string? codigoPostal = null)
        {
            var response = await _anunciosServices.ObtenerAnunciosFiltrados(
                nombreProducto, etiquetas, ciudad, estado, pais, codigoPostal);

            if (response.Result == null || response.Result.Count == 0)
            {
                return NotFound(new { message = "No se encontraron anuncios con los filtros especificados." });
            }

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
