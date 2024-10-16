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
    public class OfertasServices : IOfertasServices
    {
        private readonly ApplicationDBContext _context;

        public OfertasServices(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Response<List<OfertasDto>>> ObtenerOfertas()
        {
            try
            {
                var ofertas = await _context.ofertas
                    .Select(o => new OfertasDto
                    {
                        Id = o.Id,
                        idPersona = o.idPersona,
                        idAnuncio = o.idAnuncio,
                        monto = o.monto,
                        fecha_oferta = o.fecha_oferta,
                        estado = o.estado,
                        Tipo = o.Tipo
                    })
                    .ToListAsync();

                return new Response<List<OfertasDto>>(ofertas);
            }
            catch (Exception ex)
            {
                return new Response<List<OfertasDto>>("Error al obtener las ofertas: " + ex.Message);
            }
        }
        public async Task<Response<OfertasDto>> ObtenerOferta(int id)
        {
            try
            {
                var oferta = await _context.ofertas
                    .FirstOrDefaultAsync(o => o.Id == id);

                if (oferta == null)
                {
                    return new Response<OfertasDto>("Oferta no encontrada.");
                }

                var ofertaDto = new OfertasDto
                {
                    Id = oferta.Id,
                    idPersona = oferta.idPersona,
                    idAnuncio = oferta.idAnuncio,
                    monto = oferta.monto,
                    fecha_oferta = oferta.fecha_oferta,
                    estado = oferta.estado,
                    Tipo = oferta.Tipo
                };

                return new Response<OfertasDto>(ofertaDto);
            }
            catch (Exception ex)
            {
                return new Response<OfertasDto>("Error al obtener la oferta: " + ex.Message);
            }
        }
        public async Task<Response<OfertasDto>> CrearOferta(OfertasDto request)
        {
            try
            {
                var nuevaOferta = new Ofertas
                {
                    idPersona = request.idPersona,
                    idAnuncio = request.idAnuncio,
                    monto = request.monto,
                    fecha_oferta = request.fecha_oferta,
                    estado = request.estado,
                    Tipo = request.Tipo
                };

                _context.ofertas.Add(nuevaOferta);
                await _context.SaveChangesAsync();

                request.Id = nuevaOferta.Id;

                return new Response<OfertasDto>(request);
            }
            catch (Exception ex)
            {
                return new Response<OfertasDto>("Error al crear la oferta: " + ex.Message);
            }
        }
        public async Task<Response<OfertasDto>> ActualizarOferta(int id, OfertasDto request)
        {
            try
            {
                var oferta = await _context.ofertas.FirstOrDefaultAsync(o => o.Id == id);

                if (oferta == null)
                {
                    return new Response<OfertasDto>("Oferta no encontrada.");
                }

                oferta.idPersona = request.idPersona;
                oferta.idAnuncio = request.idAnuncio;
                oferta.monto = request.monto;
                oferta.fecha_oferta = request.fecha_oferta;
                oferta.estado = request.estado;
                oferta.Tipo = request.Tipo;

                _context.ofertas.Update(oferta);
                await _context.SaveChangesAsync();

                return new Response<OfertasDto>(request);
            }
            catch (Exception ex)
            {
                return new Response<OfertasDto>("Error al actualizar la oferta: " + ex.Message);
            }
        }
        public async Task<Response<OfertasDto>> EliminarOferta(int id)
        {
            try
            {
                var oferta = await _context.ofertas.FirstOrDefaultAsync(o => o.Id == id);

                if (oferta == null)
                {
                    return new Response<OfertasDto>("Oferta no encontrada.");
                }

                _context.ofertas.Remove(oferta);
                await _context.SaveChangesAsync();

                return new Response<OfertasDto>(new OfertasDto { Id = oferta.Id });
            }
            catch (Exception ex)
            {
                return new Response<OfertasDto>("Error al eliminar la oferta: " + ex.Message);
            }
        }
    }
}
