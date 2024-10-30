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
                var ofertas = await _context.ofertas
                    .Where(o => o.idPersona == idPersona)
                    .Include(o => o.Anuncio)
                        .ThenInclude(a => a.Productos)
                            .ThenInclude(p => p.Fotos)
                    .Include(o => o.OfertasProductos)
                        .ThenInclude(op => op.Producto)
                            .ThenInclude(pf => pf.Fotos)
                    .Select(o => new OfertasDto
                    {
                        Id = o.Id,
                        idPersona = o.idPersona,
                        idAnuncio = o.idAnuncio,
                        monto = o.monto,
                        fecha_oferta = o.fecha_oferta,
                        estado = o.estado,
                        Tipo = o.Tipo,
                        Anuncio = new AnunciosDto
                        {
                            Id = o.Anuncio.Id,
                            fecha_expiracion = o.Anuncio.fecha_expiracion,
                            Estado = o.Anuncio.Estado,
                            precio_anuncio = o.Anuncio.precio_anuncio,
                            Productos = new ProductosDto
                            {
                                Nombre = o.Anuncio.Productos.Nombre,
                                Fotos = o.Anuncio.Productos.Fotos.Select(f => new FotosDto
                                {
                                    Id = f.Id,
                                    Url = f.Url
                                }).ToList()
                            }
                        },
                        Productos = o.OfertasProductos.Select(op => new ProductosDto
                        {
                            Nombre = op.Producto.Nombre,
                            Fotos = op.Producto.Fotos.Select(f => new FotosDto
                            {
                                Id = f.Id,
                                Url = f.Url
                            }).ToList()
                        }).ToList()
                    }).ToListAsync();
                return new Response<List<OfertasDto>>(ofertas);
            }
            catch (Exception ex) {
                return new Response<List<OfertasDto>>(ex.Message);
            }
        }
        public async Task<Response<OfertasDto>> ActualizarOferta(int id, OfertasDto request, List<ProductosDto> productos)
        {
            try
            {
                var oferta = await _context.ofertas.FirstOrDefaultAsync(o => o.Id == id);

                if (oferta == null)
                {
                    return new Response<OfertasDto>("Oferta no encontrada.");
                }

                // Actualizar la oferta con los nuevos datos
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

                // Crear nuevos productos y asociarlos a la oferta
                foreach (var producto in productos)
                {
                    var nuevoProducto = new Productos
                    {
                        Nombre = producto.Nombre, // Asegúrate de que los nombres de las propiedades sean correctos
                        Descripcion = producto.Descripcion,
                        Precio = producto.Precio,
                        Cantidad = producto.Cantidad,
                        Tipo = producto.Tipo
                    };

                    _context.productos.Add(nuevoProducto);
                    await _context.SaveChangesAsync(); // Guarda el nuevo producto en la base de datos

                    // Ahora asociamos el nuevo producto a la oferta
                    var ofertaProducto = new Ofertas_Productos
                    {
                        ofertas_id = oferta.Id,
                        productos_id = nuevoProducto.Id // Usamos el nuevo ID del producto creado
                    };

                    _context.ofertas_productos.Add(ofertaProducto);
                }

                await _context.SaveChangesAsync();

                return new Response<OfertasDto>(request);
            }
            catch (Exception ex)
            {
                return new Response<OfertasDto>("Error al actuaizar la oferta: " + ex.Message);
            }
        }


        //public async Task<Response<OfertasDto>> CrearOferta(OfertasDto request)
        //{
        //    try
        //    {
        //        var nuevaOferta = new Ofertas
        //        {
        //            idPersona = request.idPersona,
        //            idAnuncio = request.idAnuncio,
        //            monto = request.monto,
        //            fecha_oferta = request.fecha_oferta,
        //            estado = request.estado,
        //            Tipo = request.Tipo
        //        };

        //        // Añadir la oferta a la base de datos
        //        _context.ofertas.Add(nuevaOferta);
        //        await _context.SaveChangesAsync();

        //        // Asociar productos a la oferta
        //        foreach (var productoId in productoIds)
        //        {
        //            var ofertaProducto = new Ofertas_Productos
        //            {
        //                ofertas_id = nuevaOferta.Id,
        //                productos_id = productoId
        //            };
        //            _context.ofertas_productos.Add(ofertaProducto);
        //        }
        //        await _context.SaveChangesAsync();

        //        request.Id = nuevaOferta.Id;

        //        return new Response<OfertasDto>(request);
        //    }
        //    catch (Exception ex)
        //    {
        //        // Log the inner exception details
        //        var innerExceptionMessage = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
        //        return new Response<OfertasDto>("Error al crear la oferta: " + innerExceptionMessage);
        //    }
        //}

        //public async Task<Response<OfertasDto>> ActualizarOferta(int id, OfertasDto request, List<int> productoIds)
        //{
        //    try
        //    {
        //        var oferta = await _context.ofertas.FirstOrDefaultAsync(o => o.Id == id);

        //        if (oferta == null)
        //        {
        //            return new Response<OfertasDto>("Oferta no encontrada.");
        //        }

        //        oferta.idPersona = request.idPersona;
        //        oferta.idAnuncio = request.idAnuncio;
        //        oferta.monto = request.monto;
        //        oferta.fecha_oferta = request.fecha_oferta;
        //        oferta.estado = request.estado;
        //        oferta.Tipo = request.Tipo;

        //        _context.ofertas.Update(oferta);
        //        await _context.SaveChangesAsync();

        //        // Actualizar los productos asociados
        //        var ofertasProductos = await _context.ofertas_productos
        //            .Where(op => op.ofertas_id == oferta.Id)
        //            .ToListAsync();

        //        // Eliminar asociaciones antiguas
        //        _context.ofertas_productos.RemoveRange(ofertasProductos);

        //        // Asociar nuevos productos
        //        foreach (var productoId in productoIds)
        //        {
        //            var ofertaProducto = new Ofertas_Productos
        //            {
        //                ofertas_id = oferta.Id,
        //                productos_id = productoId // Cambiado a productos_Id
        //            };
        //            _context.ofertas_productos.Add(ofertaProducto);
        //        }

        //        await _context.SaveChangesAsync();

        //        return new Response<OfertasDto>(request);
        //    }
        //    catch (Exception ex)
        //    {
        //        return new Response<OfertasDto>("Error al actualizar la oferta: " + ex.Message);
        //    }
        //}
        public async Task<Response<List<OfertasDto>>> ObtenerOfertasPorAnuncio(int idAnuncio)
        {
            try
            {
                // Obtener ofertas filtrando por idAnuncio
                var ofertas = await _context.ofertas
                    .Where(o => o.idAnuncio == idAnuncio) // Filtrar por el ID del anuncio
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
                return new Response<List<OfertasDto>>("Error al obtener las ofertas del anuncio: " + ex.Message);
            }
        }
        public async Task<Response<OfertasDto>> CrearOferta(OfertasDto request, List<ProductosDto> productos)
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

                // Añadir la oferta a la base de datos y guardar para obtener su Id
                _context.ofertas.Add(nuevaOferta);
                await _context.SaveChangesAsync();

                // Crear productos asociados y relaciones
                foreach (var producto in productos)
                {
                    // Crear y guardar el producto en la base de datos
                    var nuevoProducto = new Productos
                    {
                        Nombre = producto.Nombre,
                        Descripcion = producto.Descripcion,
                        Precio = producto.Precio,
                        Cantidad = producto.Cantidad,
                        Tipo = producto.Tipo
                    };
                    _context.productos.Add(nuevoProducto);
                    await _context.SaveChangesAsync();

                    // Crear la relación de producto con la oferta en la tabla ofertas_productos
                    var ofertaProducto = new Ofertas_Productos
                    {
                        ofertas_id = nuevaOferta.Id,
                        productos_id = nuevoProducto.Id
                    };
                    _context.ofertas_productos.Add(ofertaProducto);
                }

                // Guardar las relaciones creadas en ofertas_productos
                await _context.SaveChangesAsync();

                request.Id = nuevaOferta.Id;

                return new Response<OfertasDto>(request);
            }
            catch (Exception ex)
            {
                var innerExceptionMessage = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                return new Response<OfertasDto>("Error al crear la oferta: " + innerExceptionMessage);
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
