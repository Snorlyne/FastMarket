using Domain.Dto;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Services.IServices;
using System.ComponentModel.Design;

namespace FastMarketBackEnd.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductosController : ControllerBase
    {
        private readonly IProductosServices _services;
        public ProductosController(IProductosServices services)
        {
            _services = services;
        }
        // GET: api/<ProductosController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var response = await _services.ObtenerProductos();
            return Ok(response);
        }

        // GET api/<ProductosController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var response = await _services.ObtenerProducto(id);
            return Ok(response);
        }

        // POST api/<ProductosController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ProductosDto request)
        {
            var response = await _services.CrearProducto(request);
            return Ok(response);
        }

        // PUT api/<ProductosController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] ProductosDto request)
        {
            var response = await _services.ActualizarProducto(id, request);
            return Ok(response);
        }

        // DELETE api/<ProductosController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var response = await _services.EliminarProducto(id);
            return Ok(response);
        }
    }
}
