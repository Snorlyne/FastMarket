using Common.Utilities;
using Domain.Dto;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Repository.Context;
using Services.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services
{

    public class ChatServices : IChatServices
    {
        private readonly ApplicationDBContext _dBContext;
        public ChatServices(ApplicationDBContext dBContext) => _dBContext = dBContext;


        public async Task<List<MensajesDto>> ObtenerUltimosMensajes(int idPersona)
        {
            try
            {
                var mensajes = await _dBContext.mensajes
                    .Include(m => m.Persona)
                    .Include(m => m.Oferta)
                        .ThenInclude(a => a.Anuncio)
                            .ThenInclude(p => p.Personas)
                    .Include(m => m.Oferta)
                        .ThenInclude(po => po.Personas)
                    .Where(m => m.Oferta.Anuncio.IdPersona == idPersona || m.Oferta.idPersona == idPersona &&   // Filtra por la persona
                                m.Oferta.estado == "aceptada") // Filtra solo las ofertas aceptadas
                    .GroupBy(m => m.IdOferta)
                    .Select(g => g.OrderByDescending(m => m.fecha_envio).FirstOrDefault())
                    .ToListAsync(); // Trae los mensajes a memoria

                // Proyección a MensajesDto en memoria
                var result = mensajes.Select(m => new MensajesDto
                {
                    Id = m.Id,
                    IdOferta = m.IdOferta,
                    IdPersona = m.IdPersona,
                    Contenido = m.Contenido,
                    FechaEnvio = m.fecha_envio,
                    Persona = new PersonasDto
                    {
                        Id = m.Persona.Id,
                        Nombre = m.Persona.Nombre,
                    },
                    UltimoMensaje = m.Oferta.idPersona == idPersona
                        ? m.Oferta.Personas.Nombre
                        : m.Oferta.Anuncio.Personas.Nombre,
                    NombreChat = m.Oferta.idPersona == idPersona
                        ? m.Oferta.Anuncio.Personas.Nombre // Nombre del dueño del anuncio
                        : m.Oferta.Personas.Nombre // Nombre del dueño de la oferta
                }).ToList();

                return result;
            }
            catch (Exception ex)
            {
                // Manejo de excepciones: puedes agregar logging aquí si lo deseas
                return new List<MensajesDto>(); // Retorna una lista vacía en caso de error
            }
        }



        public async Task<List<MensajesDto>> ObtenerMensajesChat(int idPersona, int idOferta)
        {
            try
            {
                var mensajes = await _dBContext.mensajes
                .Where(m => m.IdOferta == idOferta)
                .Include(m => m.Persona)
                .OrderBy(m => m.fecha_envio)
                .Select(m => new MensajesDto
                {
                    Id = m.Id,
                    IdOferta = m.IdOferta,
                    IdPersona = m.IdPersona,
                    Contenido = m.Contenido,
                    FechaEnvio = m.fecha_envio,
                    Persona = new PersonasDto
                    {
                        Id = m.Persona.Id,
                        Nombre = m.Persona.Nombre,
                    },
                    UltimoMensaje = m.IdPersona == idPersona
                        ? "propio" // Nombre del dueño del anuncio
                        : "entrante" // Nombre del dueño de la oferta
                })
                .ToListAsync();

                return new List<MensajesDto>(mensajes);

            }
            catch (Exception ex)
            {
                return [];
            }
        }

        public async Task<MensajesDto> EnviarMensaje(int idOferta, int idPersona, string contenido)
        {
            try
            {
                // Crea una nueva instancia de Mensaje
                var nuevoMensaje = new Mensajes
                {
                    IdOferta = idOferta,
                    IdPersona = idPersona,
                    Contenido = contenido,
                    fecha_envio = DateTime.UtcNow
                };

                // Guarda el nuevo mensaje en la base de datos
                _dBContext.mensajes.Add(nuevoMensaje);
                await _dBContext.SaveChangesAsync();

                // Cargar los datos de la persona para el DTO
                var persona = await _dBContext.personas.FindAsync(idPersona);

                // Retorna el mensaje en formato DTO
                return new MensajesDto
                {
                    Id = nuevoMensaje.Id,
                    IdOferta = nuevoMensaje.IdOferta,
                    IdPersona = nuevoMensaje.IdPersona,
                    Contenido = nuevoMensaje.Contenido,
                    FechaEnvio = nuevoMensaje.fecha_envio,
                };
            }
            catch (Exception ex)
            {
                // Maneja el error (opcionalmente puedes hacer logging)
                return null;
            }
        }

    }
}
