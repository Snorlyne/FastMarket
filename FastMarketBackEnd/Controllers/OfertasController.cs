using Domain.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
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
        public async Task<IActionResult> Post([FromBody] OfertasDto request)
        {
            var response = await _ofertasServices.CrearOferta(request);
            return Ok(response);
        }

        // PUT api/<OfertasController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] OfertasDto request)
        {
            var response = await _ofertasServices.ActualizarOferta(id, request);
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
}
