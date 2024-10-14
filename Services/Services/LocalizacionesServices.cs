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
    public class LocalizacionesServices : ILocalizacionesServices
    {
        private readonly ApplicationDBContext _context;

        public LocalizacionesServices(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<Response<Localizaciones>> CrearLocalizacion(LocalizacionesDto localizacionesDto)
        {
            try
            {
                var localizacion = new Localizaciones
                {
                    Ciudad = localizacionesDto.Ciudad,
                    Estado = localizacionesDto.Estado,
                    Pais = localizacionesDto.Pais,
                    codigo_postal = localizacionesDto.CodigoPostal,
                    Latitud = localizacionesDto.Latitud,
                    Longitud = localizacionesDto.Longitud
                };

                _context.localizaciones.Add(localizacion);
                await _context.SaveChangesAsync();

                localizacionesDto.Id = localizacion.Id;

                return new Response<Localizaciones>(localizacion);
            }
            catch (Exception ex)
            {
                return new Response<Localizaciones>("Ocurrió un error al crear la localización: " + ex.Message);
            }
        }
        public async Task<Response<Localizaciones>> ActualizarLocalizacion(int id, LocalizacionesDto request)
        {
            try
            {
                var localizacion = await _context.localizaciones.FindAsync(id);
                if (localizacion == null)
                {
                    return new Response<Localizaciones>("La localización no fue encontrada.");
                }
                localizacion.Ciudad = request.Ciudad;
                localizacion.Estado = request.Estado;
                localizacion.Pais = request.Pais;
                localizacion.codigo_postal = request.CodigoPostal;
                localizacion.Latitud = request.Latitud;
                localizacion.Longitud = request.Longitud;

                _context.localizaciones.Update(localizacion);
                await _context.SaveChangesAsync();

                return new Response<Localizaciones>(localizacion);
            }
            catch (Exception ex)
            {
                return new Response<Localizaciones>("Ocurrió un error al actualizar la localización: " + ex.Message);
            }
        }
        public async Task<Response<Localizaciones>> EliminarLocalizacion(int id)
        {
            try
            {
                var localizacion = await _context.localizaciones.FindAsync(id);
                if (localizacion == null)
                {
                    return new Response<Localizaciones>("La localización no fue encontrada.");
                }

                _context.localizaciones.Remove(localizacion);
                await _context.SaveChangesAsync();

                return new Response<Localizaciones>(localizacion);
            }
            catch (Exception ex)
            {
                return new Response<Localizaciones>("Ocurrió un error al eliminar la localización: " + ex.Message);
            }
        }
    }
}
