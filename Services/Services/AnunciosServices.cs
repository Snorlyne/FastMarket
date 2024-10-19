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
    public class AnunciosServices : IAnunciosServices
    {
        private readonly ILocalizacionesServices _localizacionesServices;
        private readonly IProductosServices _productosServices;
        private readonly ApplicationDBContext _dBContext;
        public AnunciosServices(ApplicationDBContext dBContext, ILocalizacionesServices localizacionesServices, IProductosServices productosServices)
        {
            _dBContext = dBContext;
            _localizacionesServices = localizacionesServices;
            _productosServices = productosServices;
        }
        public async Task<Response<List<AnunciosDto>>> ObtenerAnuncios()
        {
            try
            {
                List<AnunciosDto> response = await _dBContext.anuncios
                  .Include(x => x.Localizacion)
                  .Include(x => x.Personas)
                  .Include(x => x.Productos)
                  .Select(a => new AnunciosDto
                  {
                      Id = a.Id,
                      Personas = new PersonasDto
                      {
                          Id = a.Personas.Id,
                          Nombre = a.Personas.Nombre,
                          Apellido = a.Personas.Apellido,
                          IdUsuario = a.Personas.IdUsuario
                      },
                      Productos = new ProductosDto
                      {
                          Id = a.Productos.Id,
                          Nombre = a.Productos.Nombre,
                          Descripcion = a.Productos.Descripcion,
                          Precio = a.Productos.Precio,
                          Cantidad = a.Productos.Cantidad,
                          Tipo = a.Productos.Tipo
                      },
                      Localizacion = new LocalizacionesDto
                      {
                          Id = a.Localizacion.Id,
                          Ciudad = a.Localizacion.Ciudad,
                          Estado = a.Localizacion.Estado,
                          Pais = a.Localizacion.Pais,
                          CodigoPostal = a.Localizacion.codigo_postal,
                          Latitud = a.Localizacion.Latitud,
                          Longitud = a.Localizacion.Longitud
                      },
                      fecha_publicacion = a.fecha_publicacion,
                      fecha_expiracion = a.fecha_expiracion,
                      Estado = a.Estado,
                      precio_anuncio = a.precio_anuncio,
                      Descripcion = a.Descripcion,
                      Tipo = a.Tipo,
                  })
                  .ToListAsync();
                return new Response<List<AnunciosDto>>(response);
            }
            catch (Exception ex)
            {
                return new Response<List<AnunciosDto>>("Ocurrió un error al obtener los anuncios: " + ex.Message);
            }
        }
        public async Task<Response<AnunciosDto>> ObtenerAnuncio(int id)
        {
            try
            {
                Anuncios anuncio = await _dBContext.anuncios
                     .Include(a => a.Localizacion)
                     .Include(a => a.Personas)
                     .Include(a => a.Productos)
                     .FirstOrDefaultAsync(a => a.Id == id) ?? throw new Exception("Anuncio no encontrado");

                AnunciosDto anuncioDto = new ()
                {
                    Id = anuncio.Id,
                    Personas = new PersonasDto
                    {
                        Id = anuncio.Personas.Id,
                        Nombre = anuncio.Personas.Nombre,
                        Apellido = anuncio.Personas.Apellido,
                        IdUsuario = anuncio.Personas.IdUsuario
                    },
                    Productos = new ProductosDto
                    {
                        Id = anuncio.Productos.Id,
                        Nombre = anuncio.Productos.Nombre,
                        Descripcion = anuncio.Productos.Descripcion,
                        Precio = anuncio.Productos.Precio,
                        Cantidad = anuncio.Productos.Cantidad,
                        Tipo = anuncio.Productos.Tipo
                    },
                    Localizacion = new LocalizacionesDto
                    {
                        Id = anuncio.Localizacion.Id,
                        Ciudad = anuncio.Localizacion.Ciudad,
                        Estado = anuncio.Localizacion.Estado,
                        Pais = anuncio.Localizacion.Pais,
                        CodigoPostal = anuncio.Localizacion.codigo_postal,
                        Latitud = anuncio.Localizacion.Latitud,
                        Longitud = anuncio.Localizacion.Longitud
                    },
                    fecha_publicacion = anuncio.fecha_publicacion,
                    fecha_expiracion = anuncio.fecha_expiracion,
                    Estado = anuncio.Estado,
                    precio_anuncio = anuncio.precio_anuncio,
                    Descripcion = anuncio.Descripcion,
                    Tipo = anuncio.Tipo,
                };

                return new Response<AnunciosDto>(anuncioDto);
            }
            catch (Exception e)
            {
                return new Response<AnunciosDto>("Ocurrió un error al obtener el anuncio: " + e.Message);
            }
        }
        public async Task<Response<AnunciosDto>> CrearAnuncio(AnunciosDto request, int idPersona)
        {
            using var transaction = await _dBContext.Database.BeginTransactionAsync();

            try
            {
                // Verificar que la persona especificada exista
                var persona = await _dBContext.personas.FindAsync(idPersona);
                if (persona == null)
                {
                    throw new Exception("La persona especificada no existe.");
                }
                // Crear nuevo producto usando el servicio de productos
                Response<ProductosDto> productoResponse = await _productosServices.CrearProducto(request.Productos);
                if (!productoResponse.IsSuccess)
                 {
                      throw new Exception("Error al crear el producto.");
                 }
                ProductosDto producto = productoResponse.Result;
                // Crear nueva localización usando el servicio de localizaciones
                Response<Localizaciones> localizacionResponse = await _localizacionesServices.CrearLocalizacion(request.Localizacion);
                 if (!localizacionResponse.IsSuccess)
                 {
                     throw new Exception("Error al crear la localización.");
                 }
                 Localizaciones localizacion = localizacionResponse.Result;
                // Crear la entidad de anuncio
                Anuncios nuevoAnuncio = new Anuncios
                {
                    IdPersona = idPersona,
                    IdProducto = productoResponse.Result.Id,
                    IdLocalizacion = localizacionResponse.Result.Id, 
                    fecha_publicacion = DateTime.Now,
                    fecha_expiracion = request.fecha_expiracion,
                    Estado = request.Estado,
                    precio_anuncio = request.precio_anuncio,
                    Descripcion = request.Descripcion,
                    Tipo = request.Tipo
                };
                _dBContext.anuncios.Add(nuevoAnuncio);
                await _dBContext.SaveChangesAsync();
                await transaction.CommitAsync();
                // Mapear el anuncio creado a un DTO para la respuesta
                AnunciosDto anuncioCreado = new AnunciosDto
                {
                    Id = nuevoAnuncio.Id,
                    Personas = new PersonasDto
                    {
                        Id = persona.Id,
                        Nombre = persona.Nombre,
                        Apellido = persona.Apellido,
                        IdUsuario = persona.IdUsuario
                    },
                    Productos = new ProductosDto
                    {
                        Id = producto.Id,
                        Nombre = producto.Nombre,
                        Descripcion = producto.Descripcion,
                        Precio = producto.Precio,
                        Cantidad = producto.Cantidad,
                        Tipo = producto.Tipo
                    },
                    Localizacion = new LocalizacionesDto
                    {
                        Id = localizacion.Id,
                        Ciudad = localizacion.Ciudad,
                        Estado = localizacion.Estado,
                        Pais = localizacion.Pais,
                        CodigoPostal = localizacion.codigo_postal,
                        Latitud = localizacion.Latitud,
                        Longitud = localizacion.Longitud
                    },
                    fecha_publicacion = nuevoAnuncio.fecha_publicacion,
                    fecha_expiracion = nuevoAnuncio.fecha_expiracion,
                    Estado = nuevoAnuncio.Estado,
                    precio_anuncio = nuevoAnuncio.precio_anuncio,
                    Descripcion = nuevoAnuncio.Descripcion,
                    Tipo = nuevoAnuncio.Tipo
                };

                return new Response<AnunciosDto>(anuncioCreado);
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return new Response<AnunciosDto>("Ocurrió un error al crear el anuncio: " + ex.Message);
            }
        }
        public async Task<Response<AnunciosDto>> ActualizarAnuncio(int id, AnunciosDto request)
        {
            try
            {
                var anuncioExistente = await _dBContext.anuncios
                    .Include(a => a.Personas)
                    .FirstOrDefaultAsync(a => a.Id == id);

                if (anuncioExistente == null)
                {
                    return new Response<AnunciosDto>("Anuncio no encontrado.");
                }

                // Verificar si el producto y localización existen
                if (anuncioExistente.IdProducto == 0 || anuncioExistente.IdLocalizacion == 0)
                {
                    throw new Exception("El producto o la localización no están asociados correctamente.");
                }

                // Actualizar el producto
                Response<ProductosDto> productoResponse = await _productosServices.ActualizarProducto(anuncioExistente.IdProducto, request.Productos);
                if (!productoResponse.IsSuccess)
                {
                    throw new Exception("Error al actualizar el producto.");
                }

                // Actualizar la localización
                Response<Localizaciones> localizacionResponse = await _localizacionesServices.ActualizarLocalizacion(anuncioExistente.IdLocalizacion, request.Localizacion);
                if (!localizacionResponse.IsSuccess)
                {
                    throw new Exception("Error al actualizar la localización.");
                }

                // Actualizar los detalles del anuncio
                anuncioExistente.fecha_expiracion = request.fecha_expiracion;
                anuncioExistente.Estado = request.Estado;
                anuncioExistente.precio_anuncio = request.precio_anuncio;
                anuncioExistente.Descripcion = request.Descripcion;
                anuncioExistente.Tipo = request.Tipo;

                _dBContext.anuncios.Update(anuncioExistente);
                await _dBContext.SaveChangesAsync();

                var anuncioActualizado = new AnunciosDto
                {
                    Id = anuncioExistente.Id,
                    Personas = anuncioExistente.Personas != null ? new PersonasDto
                    {
                        Id = anuncioExistente.Personas.Id,
                        Nombre = anuncioExistente.Personas.Nombre,
                        Apellido = anuncioExistente.Personas.Apellido,
                        IdUsuario = anuncioExistente.Personas.IdUsuario
                    } : null,  // Manejar el caso si la Persona es null
                    Productos = productoResponse.Result,
                    Localizacion = new LocalizacionesDto
                    {
                        Id = localizacionResponse.Result.Id,
                        Ciudad = localizacionResponse.Result.Ciudad,
                        Estado = localizacionResponse.Result.Estado,
                        Pais = localizacionResponse.Result.Pais,
                        CodigoPostal = localizacionResponse.Result.codigo_postal,
                        Latitud = localizacionResponse.Result.Latitud,
                        Longitud = localizacionResponse.Result.Longitud
                    },
                    fecha_publicacion = anuncioExistente.fecha_publicacion,
                    fecha_expiracion = anuncioExistente.fecha_expiracion,
                    Estado = anuncioExistente.Estado,
                    precio_anuncio = anuncioExistente.precio_anuncio,
                    Descripcion = anuncioExistente.Descripcion,
                    Tipo = anuncioExistente.Tipo
                };
                return new Response<AnunciosDto>(anuncioActualizado);
            }
            catch (Exception ex)
            {
                return new Response<AnunciosDto>("Ocurrió un error al actualizar el anuncio: " + ex.Message);
            }
        }
        public async Task<Response<AnunciosDto>> EliminarAnuncio(int id)
        {
            using var transaction = await _dBContext.Database.BeginTransactionAsync();
            try
            {
                var anuncioExistente = await _dBContext.anuncios.FindAsync(id);
                if (anuncioExistente == null)
                {
                    return new Response<AnunciosDto>("Anuncio no encontrado.");
                }
                _dBContext.anuncios.Remove(anuncioExistente);
                await _dBContext.SaveChangesAsync();
                await transaction.CommitAsync();
                return new Response<AnunciosDto>(new AnunciosDto { Id = anuncioExistente.Id });
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return new Response<AnunciosDto>("Ocurrió un error al eliminar el anuncio: " + ex.Message);
            }
        }
    }
}
