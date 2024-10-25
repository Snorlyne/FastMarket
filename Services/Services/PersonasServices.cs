using Domain.Dto;
using Domain.Entities;
using Repository.Context;
using Services.IServices;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Common.Utilities;

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
            try
            {
                var response = await _context.personas
                    .Include(p => p.Usuario) // Incluir la relación con Usuarios
                    .Select(p => new PersonasDto
                    {
                        Id = p.Id,
                        Nombre = p.Nombre,
                        Apellido = p.Apellido,
                        IdUsuario = p.IdUsuario,
                        Usuarios = new UsuariosDto
                        {
                            Id = p.Usuario.Id,
                            Correo = p.Usuario.Correo,
                            IdRol = p.Usuario.IdRol,
                        },
                    })
                    .ToListAsync();

                return response;
            }
            catch (Exception ex)
            {
                throw new Exception("Ocurrió un error al obtener las personas: " + ex.Message);
            }
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

        public async Task<Response<PersonasDto>> CrearPersona(PersonasDto personaDto)
        {
            try
            {
                // Validaciones básicas
                if (string.IsNullOrEmpty(personaDto.Nombre))
                {
                    throw new Exception("El nombre es requerido.");
                }

                if (string.IsNullOrEmpty(personaDto.Apellido))
                {
                    throw new Exception("El apellido es requerido.");
                }

                // Crear una nueva instancia de la entidad Persona
                var persona = new Personas
                {
                    Nombre = personaDto.Nombre,
                    Apellido = personaDto.Apellido,
                    IdUsuario = personaDto.IdUsuario
                };

                // Agregar la persona al contexto y guardar cambios
                _context.personas.Add(persona);
                await _context.SaveChangesAsync();

                // Actualizar el ID de persona en el DTO
                personaDto.Id = persona.Id;

                // Devolver el DTO de la persona creada en un Response exitoso
                return new Response<PersonasDto>(personaDto, "Persona creada exitosamente.");
            }
            catch (Exception ex)
            {
                // Lanza la excepción con el mensaje de error
                throw new Exception($"Error al crear la persona: {ex.Message}");
            }
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
