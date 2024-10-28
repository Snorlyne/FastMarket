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
                    .Include(o => o.OfertasProductos) // Incluir productos asociados
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
                    .Include(o => o.OfertasProductos) // Incluir productos asociados
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

        public async Task<Response<List<OfertasDto>>> ObtenerOfertasUsuario(int idPersona)
        {
            try
            {
                // Obtener ofertas filtrando por idPersona
                var ofertas = await _context.ofertas
                    .Where(o => o.idPersona == idPersona) // Filtrar por el ID de la persona
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
                return new Response<List<OfertasDto>>("Error al obtener las ofertas del usuario: " + ex.Message);
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

                // Añadir la oferta a la base de datos
                _context.ofertas.Add(nuevaOferta);
                await _context.SaveChangesAsync();

                // Asociar productos a la oferta
                foreach (var productoId in productoIds)
                {
                    var ofertaProducto = new Ofertas_Productos
                    {
                        ofertas_id = nuevaOferta.Id,
                        productos_id = productoId
                    };
                    _context.ofertas_productos.Add(ofertaProducto);
                }
                await _context.SaveChangesAsync();

                request.Id = nuevaOferta.Id;

                return new Response<OfertasDto>(request);
            }
            catch (Exception ex)
            {
                // Log the inner exception details
                var innerExceptionMessage = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                return new Response<OfertasDto>("Error al crear la oferta: " + innerExceptionMessage);
            }
        }

        public async Task<Response<OfertasDto>> ActualizarOferta(int id, OfertasDto request, List<int> productoIds)
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

                // Actualizar los productos asociados
                var ofertasProductos = await _context.ofertas_productos
                    .Where(op => op.ofertas_id == oferta.Id)
                    .ToListAsync();

                // Eliminar asociaciones antiguas
                _context.ofertas_productos.RemoveRange(ofertasProductos);

                // Asociar nuevos productos
                foreach (var productoId in productoIds)
                {
                    var ofertaProducto = new Ofertas_Productos
                    {
                        ofertas_id = oferta.Id,
                        productos_id = productoId // Cambiado a productos_Id
                    };
                    _context.ofertas_productos.Add(ofertaProducto);
                }

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

                // Eliminar las asociaciones de productos
                var ofertasProductos = await _context.ofertas_productos
                    .Where(op => op.ofertas_id == oferta.Id)
                    .ToListAsync();

                _context.ofertas_productos.RemoveRange(ofertasProductos);

                // Eliminar la oferta
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
