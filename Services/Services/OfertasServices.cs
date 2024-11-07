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
using static Common.Utilities.Enums;

namespace Services.Services
{
    public class OfertasServices : IOfertasServices
    {
        private readonly ApplicationDBContext _context;
        private readonly IAnunciosServices _anunciosServices;

        public OfertasServices(ApplicationDBContext context, IAnunciosServices anunciosServices)
        {
            _context = context;
            _anunciosServices = anunciosServices;
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
                    .Where(o => o.idPersona == idPersona && o.estado == "activa")
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


        public async Task<Response<object>> ObtenerOfertasPorAnuncio(int idPersona, int idAnuncio)
        {
            try
            {
                // Obtener ofertas filtrando por idAnuncio y estado "activa"
                var ofertas = await _context.ofertas
                    .Where(o => o.idAnuncio == idAnuncio && o.estado == "activa") // Filtrar por el ID del anuncio y estado "activa"
                    .Include(o => o.OfertasProductos)
                        .ThenInclude(op => op.Producto)
                            .ThenInclude(pf => pf.Fotos)
                    .OrderByDescending(o => o.monto)
                    .Select(o => new OfertasDto
                    {
                        Id = o.Id,
                        idPersona = o.idPersona,
                        idAnuncio = o.idAnuncio,
                        monto = o.monto,
                        fecha_oferta = o.fecha_oferta,
                        estado = o.estado,
                        Tipo = o.Tipo,
                        Productos = o.OfertasProductos.Select(op => new ProductosDto
                        {
                            Nombre = op.Producto.Nombre,
                            Fotos = op.Producto.Fotos.Select(f => new FotosDto
                            {
                                Id = f.Id,
                                Url = f.Url
                            }).ToList()
                        }).ToList()
                    })
                    .ToListAsync();

                // Obtener anuncio y su propietario
                var anuncios = await _anunciosServices.ObtenerAnuncio(idAnuncio, idPersona);

                // Crear un objeto para devolver en la respuesta
                var result = new
                {
                    Ofertas = ofertas,
                    anuncios.Result?.Propietario
                };

                return new Response<object>(result);
            }
            catch (Exception ex)
            {
                return new Response<object>("Error al obtener las ofertas del anuncio: " + ex.Message);
            }
        }

        public async Task<Response<Boolean>> CambiarEstadoOferta(int idOferta, EstadoOferta nuevoEstado)
        {
            try
            {
                // Buscar la oferta
                Ofertas oferta = await _context.ofertas.FirstOrDefaultAsync(x => x.Id == idOferta);

                if (oferta == null)
                {
                    throw new Exception("Oferta no encontrada.");
                }

                // Cambiar el estado de la oferta
                oferta.estado = nuevoEstado.ToString().ToLower(); // Convierte el enum a string y lo convierte a minúsculas

                _context.ofertas.Update(oferta);
                await _context.SaveChangesAsync();

                return new Response<Boolean>(true, $"Oferta cambiada a {nuevoEstado}.");
            }
            catch (Exception ex)
            {
                return new Response<Boolean>("Error al cambiar el estado de la oferta: " + ex.Message);
            }
        }

        public async Task<Response<OfertasCreateDto>> CrearEditarOferta(int idPersona, int idAnuncio, OfertasCreateDto request, List<ProductosDto> productos)
        {
            try
            {
                var nuevaOferta = new Ofertas { };
                var oferta = await _context.ofertas.FirstOrDefaultAsync(o => o.idPersona == idPersona && o.idAnuncio == idAnuncio && o.estado == "activa");
                if (oferta != null)
                {
                    oferta.monto = request.monto;
                    oferta.fecha_oferta = DateTime.Now;

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

                }
                else
                {
                    nuevaOferta = new Ofertas
                    {
                        idPersona = idPersona,
                        idAnuncio = idAnuncio,
                        monto = request.monto,
                        fecha_oferta = DateTime.Now,
                        estado = "activa",
                        Tipo = request.Tipo
                    };
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
                }


                return new Response<OfertasCreateDto>(request);
            }
            catch (Exception ex)
            {
                var innerExceptionMessage = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                return new Response<OfertasCreateDto>("Error al crear la oferta: " + innerExceptionMessage);
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
