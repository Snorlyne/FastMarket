using Domain.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FastMarketBackEnd.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PersonasController : ControllerBase
    {
        private readonly IPersonasServices _personasServices;

        public PersonasController(IPersonasServices personasServices)
        {
            _personasServices = personasServices;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PersonasDto>>> GetPersonas()
        {
            var personas = await _personasServices.ObtenerPersonas();
            return Ok(personas);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PersonasDto>> GetPersona(int id)
        {
            var persona = await _personasServices.ObtenerPersonaPorId(id);
            if (persona == null)
            {
                return NotFound();
            }
            return Ok(persona);
        }

        [HttpPost]
        public async Task<IActionResult> PostPersona([FromBody] PersonasDto personaDto)
        {
            var personaCreada = await _personasServices.CrearPersona(personaDto);
            return CreatedAtAction(nameof(GetPersona), new { id = personaCreada.Result.Id }, personaCreada);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutPersona(int id, [FromBody] PersonasDto personaDto)
        {
            var actualizado = await _personasServices.ActualizarPersona(id, personaDto);
            if (!actualizado)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePersona(int id)
        {
            var eliminado = await _personasServices.EliminarPersona(id);
            if (!eliminado)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
