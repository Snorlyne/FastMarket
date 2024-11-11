using Domain.Dto;
using Microsoft.AspNetCore.Mvc;
using Services.IServices;

namespace FastMarketBackEnd.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LocalizacionesController : ControllerBase
    {
        private readonly ILocalizacionesServices _localizacionesServices;
        public LocalizacionesController(ILocalizacionesServices localizacionesServices)
        {
            _localizacionesServices = localizacionesServices;
        }
        // POST api/<LocalizacionesController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] LocalizacionesDto request)
        {
            var response = await _localizacionesServices.CrearLocalizacion(request);
            return Ok(response);
        }

        // PUT api/<LocalizacionesController>
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] LocalizacionesDto request)
        {
            var response = await _localizacionesServices.ActualizarLocalizacion(id, request);
            return Ok(response);
        }

        // DELETE api/<LocalizacionesController>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var response = await _localizacionesServices.EliminarLocalizacion(id);
            return Ok(response);
        }
    }
}
