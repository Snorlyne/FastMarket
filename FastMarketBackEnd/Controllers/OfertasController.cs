using Domain.Dto;
using Microsoft.AspNetCore.Mvc;
using Services.IServices;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
            // Validar la solicitud
            if (request == null)
            {
                return BadRequest("La solicitud es inválida.");
            }

            // Verificar el tipo de oferta y aplicar la lógica según el tipo
            switch (request.Oferta.Tipo)
            {
                case "dinero":
                    if (request.Productos != null && request.Productos.Any())
                    {
                        return BadRequest("No se deben incluir productos cuando la oferta es de tipo dinero.");
                    }
                    if (request.Oferta.monto <= 0)
                    {
                        return BadRequest("El monto debe ser mayor a cero para el tipo dinero.");
                    }
                    break;

                case "producto":
                    if (request.Productos == null || !request.Productos.Any())
                    {
                        return BadRequest("Debe incluir productos cuando la oferta es de tipo producto.");
                    }
                    if (request.Oferta.monto != 0)
                    {
                        return BadRequest("El monto debe ser cero cuando la oferta es de tipo producto.");
                    }
                    break;

                case "dinero_producto":
                    if (request.Productos == null || !request.Productos.Any())
                    {
                        return BadRequest("Debe incluir productos cuando la oferta es de tipo dinero_producto.");
                    }
                    if (request.Oferta.monto <= 0)
                    {
                        return BadRequest("El monto debe ser mayor a cero para el tipo dinero_producto.");
                    }
                    break;

                default:
                    return BadRequest("El tipo de oferta es inválido.");
            }

            var response = await _ofertasServices.CrearOferta(request.Oferta, request.Productos);
            return Ok(response);
        }

        // PUT api/<OfertasController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] ActualizarOfertaRequest request)
        {
            // Validar la solicitud
            if (request == null)
            {
                return BadRequest("La solicitud es inválida.");
            }

            // Verificar el tipo de oferta y aplicar la lógica según el tipo
            switch (request.Oferta.Tipo)
            {
                case "dinero":
                    if (request.Productos != null && request.Productos.Any())
                    {
                        return BadRequest("No se deben incluir productos cuando la oferta es de tipo dinero.");
                    }
                    if (request.Oferta.monto <= 0)
                    {
                        return BadRequest("El monto debe ser mayor a cero para el tipo dinero.");
                    }
                    break;

                case "producto":
                    if (request.Productos == null || !request.Productos.Any())
                    {
                        return BadRequest("Debe incluir productos cuando la oferta es de tipo producto.");
                    }
                    if (request.Oferta.monto != 0)
                    {
                        return BadRequest("El monto debe ser cero cuando la oferta es de tipo producto.");
                    }
                    break;

                case "dinero_producto":
                    if (request.Productos == null || !request.Productos.Any())
                    {
                        return BadRequest("Debe incluir productos cuando la oferta es de tipo dinero_producto.");
                    }
                    if (request.Oferta.monto <= 0)
                    {
                        return BadRequest("El monto debe ser mayor a cero para el tipo dinero_producto.");
                    }
                    break;

                default:
                    return BadRequest("El tipo de oferta es inválido.");
            }

            var response = await _ofertasServices.ActualizarOferta(id, request.Oferta, request.Productos);
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
        public List<ProductosDto> Productos { get; set; }
    }

    public class ActualizarOfertaRequest
    {
        public OfertasDto Oferta { get; set; }
        public List<ProductosDto> Productos { get; set; }
    }
}
