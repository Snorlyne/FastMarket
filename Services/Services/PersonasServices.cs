using Domain.Dto;
using Domain.Entities;
using Repository.Context;
using Services.IServices;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.Services
{
    public class PersonasServices : IPersonasServices
    {
        private readonly ApplicationDBContext _context;

        public PersonasServices(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<PersonasDto>> ObtenerPersonas()
        {
            return await _context.personas
                .Select(p => new PersonasDto
                {
                    Id = p.Id,
                    Nombre = p.Nombre,
                    Apellido = p.Apellido,
                    IdUsuario = p.IdUsuario
                })
                .ToListAsync();
        }

        public async Task<PersonasDto> ObtenerPersonaPorId(int id)
        {
            var persona = await _context.personas.FindAsync(id);
            if (persona == null) return null;

            return new PersonasDto
            {
                Id = persona.Id,
                Nombre = persona.Nombre,
                Apellido = persona.Apellido,
                IdUsuario = persona.IdUsuario
            };
        }

        public async Task<PersonasDto> CrearPersona(PersonasDto personaDto)
        {
            var persona = new Personas
            {
                Nombre = personaDto.Nombre,
                Apellido = personaDto.Apellido,
                IdUsuario = personaDto.IdUsuario
            };

            _context.personas.Add(persona);
            await _context.SaveChangesAsync();

            personaDto.Id = persona.Id;
            return personaDto;
        }

        public async Task<bool> ActualizarPersona(int id, PersonasDto personaDto)
        {
            var persona = await _context.personas.FindAsync(id);
            if (persona == null) return false;

            persona.Nombre = personaDto.Nombre;
            persona.Apellido = personaDto.Apellido;
            persona.IdUsuario = personaDto.IdUsuario;

            _context.personas.Update(persona);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> EliminarPersona(int id)
        {
            var persona = await _context.personas.FindAsync(id);
            if (persona == null) return false;

            _context.personas.Remove(persona);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
