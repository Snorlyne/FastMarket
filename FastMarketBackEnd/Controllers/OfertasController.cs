using Domain.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.IServices;

namespace FastMarketBackEnd.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OfertasController : ControllerBase
    {
        private readonly IOfertasServices _ofertasServices;

        public OfertasController(IOfertasServices ofertasServices)
        {
            _ofertasServices = ofertasServices;
        }

        // GET: api/<OfertasController>
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Get()
        {
            var response = await _ofertasServices.ObtenerOfertas();
            return Ok(response);
        }

        // GET api/<OfertasController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var response = await _ofertasServices.ObtenerOferta(id);
            return Ok(response);
        }

        // POST api/<OfertasController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CrearOfertaRequest request)
        {
            // Validar la solicitud y asegurar que contenga la lista de IDs de productos
            if (request == null || request.ProductoIds == null || !request.ProductoIds.Any())
            {
                return BadRequest("La solicitud es inválida. Asegúrate de incluir los IDs de los productos.");
            }

            var response = await _ofertasServices.CrearOferta(request.Oferta, request.ProductoIds);
            return Ok(response);
        }

        // PUT api/<OfertasController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] ActualizarOfertaRequest request)
        {
            // Validar la solicitud y asegurar que contenga la lista de IDs de productos
            if (request == null || request.ProductoIds == null || !request.ProductoIds.Any())
            {
                return BadRequest("La solicitud es inválida. Asegúrate de incluir los IDs de los productos.");
            }

            var response = await _ofertasServices.ActualizarOferta(id, request.Oferta, request.ProductoIds);
            return Ok(response);
        }

        // DELETE api/<OfertasController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var response = await _ofertasServices.EliminarOferta(id);
            return Ok(response);
        }
    }

    // Clases para la creación y actualización de ofertas
    public class CrearOfertaRequest
    {
        public OfertasDto Oferta { get; set; }
        public List<int> ProductoIds { get; set; }
    }

    public class ActualizarOfertaRequest
    {
        public OfertasDto Oferta { get; set; }
        public List<int> ProductoIds { get; set; }
    }
}
