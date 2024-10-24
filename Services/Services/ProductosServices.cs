using Common.Utilities;
using Domain.Dto;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Repository.Context;
using Services.IServices;
using static Common.Utilities.Enums;

namespace Services.Services
{
    public class ProductosServices : IProductosServices
    {
        private readonly IFotosServices _fotosServices;
        private readonly IEtiquetasServices _etiquetasServices;
        private readonly ApplicationDBContext _dBContext;

        public ProductosServices(ApplicationDBContext dBContext, IFotosServices fotosServices, IEtiquetasServices etiquetasServices)
        {
            _dBContext = dBContext;
            _fotosServices = fotosServices;
            _etiquetasServices = etiquetasServices;
        }

        public async Task<Response<List<ProductosDto>>> ObtenerProductos()
        {

            try
            {
                List<ProductosDto> response = await _dBContext.productos
                    .Include(x => x.Fotos)
                    .Include(z => z.ProductosEtiquetas)
                        .ThenInclude(w => w.Etiquetas)
                    .Select(p => new ProductosDto
                    {
                        Id = p.Id,
                        Nombre = p.Nombre,
                        Descripcion = p.Descripcion,
                        Precio = p.Precio,
                        Cantidad = p.Cantidad,
                        Tipo = p.Tipo,
                        Fotos = p.Fotos.Select(pf => new FotosDto { Id = pf.Id, Url = pf.Url }).ToList(),
                        Etiquetas = p.ProductosEtiquetas.Select(pe => new EtiquetasDto { Nombre = pe.Etiquetas.Nombre }).ToList()
                    })
                    .ToListAsync();

                return new Response<List<ProductosDto>>(response);

            }
            catch (Exception ex) 
            {
                return new Response<List<ProductosDto>>("Ocurrió un error al obtener los productos: " + ex.Message);
            }
        }
        public async Task<Response<ProductosDto>> ObtenerProducto(int id)
        {
            try
            {
                Productos producto = await _dBContext.productos
                    .Include(y => y.Fotos)
                    .Include(z => z.ProductosEtiquetas)
                        .ThenInclude(w => w.Etiquetas)
                    .FirstOrDefaultAsync(x => x.Id == id) ?? throw new Exception("Producto no encontrado");

                ProductosDto response = new()
                {
                    Id = id,
                    Cantidad = producto.Cantidad,
                    Fotos = producto.Fotos.Select(pf => new FotosDto { Id = pf.Id, Url = pf.Url }).ToList(),
                    Descripcion = producto.Descripcion,
                    Nombre = producto.Nombre,
                    Precio = producto.Precio,
                    Tipo = producto.Tipo,
                    Etiquetas = producto.ProductosEtiquetas.Select(pe => new EtiquetasDto { Nombre = pe.Etiquetas.Nombre }).ToList(),
                };

                return new Response<ProductosDto>(response);
                
            }
            catch (Exception ex)
            {
                return new Response<ProductosDto>("Ocurrió un error al obtener el producto: " + ex.Message);
            }

        }
        public async Task<Response<ProductosDto>> CrearProducto(ProductosDto request)
        {
            try
            {
                // Crear el producto
                Productos producto = new()
                {
                    Cantidad = request.Cantidad,
                    Descripcion = request.Descripcion,
                    Nombre = request.Nombre,
                    Precio = request.Precio,
                    Tipo = request.Tipo,
                };

                // Agregar el producto a la base de datos
                await _dBContext.productos.AddAsync(producto);
                await _dBContext.SaveChangesAsync(); // Guardar producto para obtener su ID

                // Crear fotos asociadas al producto
                Response<List<Fotos>> fotosResponse = await _fotosServices.CrearFoto(request.Fotos, producto.Id);
                if (!fotosResponse.IsSuccess)
                {
                    throw new Exception("Error al crear las fotos del producto.");
                }

                // Crear etiquetas asociadas al producto
                Response<List<Etiquetas>> etiquetasResponse = await _etiquetasServices.Anexar(request.Etiquetas);
                if (!etiquetasResponse.IsSuccess)
                {
                    throw new Exception("Error al anexar las etiquetas.");
                }

                // Asignar las etiquetas al producto
                foreach (var etiqueta in etiquetasResponse.Result)
                {
                    Productos_Etiquetas productoEtiqueta = new()
                    {
                        productos_Id = producto.Id,
                        etiquetas_id = etiqueta.Id
                    };
                    await _dBContext.productos_etiquetas.AddAsync(productoEtiqueta);
                }

                // Guardar todas las etiquetas y finalizar la transacción
                await _dBContext.SaveChangesAsync();


                // Construir el DTO de respuesta
                ProductosDto response = new ProductosDto
                {
                    Id = producto.Id,
                    Cantidad = producto.Cantidad,
                    Descripcion = producto.Descripcion,
                    Nombre = producto.Nombre,
                    Precio = producto.Precio,
                    Tipo = producto.Tipo,
                    Fotos = fotosResponse.Result.Select(f => new FotosDto { Id = f.Id, Url = f.Url }).ToList(),
                    Etiquetas = etiquetasResponse.Result.Select(e => new EtiquetasDto { Nombre = e.Nombre }).ToList()
                };

                return new Response<ProductosDto>(response, "Producto registrado correctamente.");

            }
            catch(Exception ex)
            {
                return new Response<ProductosDto>("Ocurrió un error al crear el peoducto: " + ex.Message);
            }
        }
        public async Task<Response<ProductosDto>> ActualizarProducto(int id, ProductosDto request)
        {
            using var transaction = await _dBContext.Database.BeginTransactionAsync();
            try
            {
                // Obtener el producto y sus relaciones
                Productos producto = await _dBContext.productos
                    .Include(x => x.Fotos)
                    .Include(z => z.ProductosEtiquetas)
                        .ThenInclude(w => w.Etiquetas)
                    .FirstOrDefaultAsync(x => x.Id == id)
                    ?? throw new Exception("Producto no encontrado");

                // Actualizar las propiedades del producto
                producto.Descripcion = request.Descripcion;
                producto.Cantidad = request.Cantidad;
                producto.Nombre = request.Nombre;
                producto.Precio = request.Precio;
                producto.Tipo = request.Tipo;

                // Actualizar fotos
                List<FotosDto> fotosAEliminar = FotosAEliminar(producto, request.Fotos);
                Response<List<Fotos>> responseFotos = await _fotosServices.EliminarFoto(fotosAEliminar);
                if (!responseFotos.IsSuccess)
                {
                    throw new Exception("Error al eliminar las fotos");
                }

                // Crear nuevas fotos
                responseFotos = await _fotosServices.CrearFoto(request.Fotos, producto.Id);
                if (!responseFotos.IsSuccess)
                {
                    throw new Exception("Error al crear las fotos");
                }

                // Actualizar etiquetas
                List<EtiquetasDto> etiquetasAEliminar = EtiquetasAEliminar(producto, request.Etiquetas);
                foreach (EtiquetasDto etiqueta in etiquetasAEliminar)
                {
                    // Buscar la etiqueta para eliminarla
                    Productos_Etiquetas pe = await _dBContext.productos_etiquetas
                        .Include(e => e.Etiquetas)
                        .FirstOrDefaultAsync(x => x.Etiquetas.Nombre == etiqueta.Nombre && x.productos_Id == producto.Id);

                    if (pe != null)
                    {
                        _dBContext.productos_etiquetas.Remove(pe);
                    }
                }

                // Anexar nuevas etiquetas
                Response<List<Etiquetas>> etiquetasResponse = await _etiquetasServices.Anexar(request.Etiquetas);
                if (!etiquetasResponse.IsSuccess)
                {
                    throw new Exception("Error al anexar las etiquetas");
                }

                // Relacionar el producto con las nuevas etiquetas
                foreach (Etiquetas etiqueta in etiquetasResponse.Result)
                {
                    bool existe = await _dBContext.productos_etiquetas
                        .AnyAsync(x => x.etiquetas_id == etiqueta.Id && x.productos_Id == producto.Id);

                    if (!existe)
                    {
                        Productos_Etiquetas nuevoProductoEtiqueta = new()
                        {
                            productos_Id = producto.Id,
                            etiquetas_id = etiqueta.Id
                        };
                        await _dBContext.productos_etiquetas.AddAsync(nuevoProductoEtiqueta);
                    }
                }

                // Guardar cambios
                await _dBContext.SaveChangesAsync();
                await transaction.CommitAsync();

                // Crear el objeto de respuesta
                ProductosDto response = new ProductosDto
                {
                    Id = producto.Id,
                    Cantidad = producto.Cantidad,
                    Descripcion = producto.Descripcion,
                    Nombre = producto.Nombre,
                    Precio = producto.Precio,
                    Tipo = producto.Tipo,
                    Fotos = producto.Fotos.Select(f => new FotosDto { Id = f.Id, Url = f.Url }).ToList(),
                    Etiquetas = producto.ProductosEtiquetas.Select(e => new EtiquetasDto { Nombre = e.Etiquetas.Nombre }).ToList()
                };

                return new Response<ProductosDto>(response, "Producto actualizado correctamente.");

            }
            catch(Exception ex)
            {
                await transaction.RollbackAsync();
                return new Response<ProductosDto>("Ocurrió un error al obtener el peoducto: " + ex.Message);
            }
        }
        public async Task<Response<ProductosDto>> EliminarProducto(int id)
        {
            using var transaction = await _dBContext.Database.BeginTransactionAsync();
            try
            {
                Productos producto = await _dBContext.productos
                    .Include(y => y.Fotos)
                    .Include(z => z.ProductosEtiquetas)
                        .ThenInclude(w => w.Etiquetas)
                    .FirstOrDefaultAsync(x => x.Id == id) ?? throw new Exception("Producto no encontrado");

                _dBContext.productos_etiquetas.RemoveRange(producto.ProductosEtiquetas);

                var fotos = producto.Fotos.Select(pf => new FotosDto
                {
                    Id = pf.Id,
                    Url = pf.Url
                }).ToList();
                Response<List<Fotos>> responseF = await _fotosServices.EliminarFoto(fotos);
                if (!responseF.IsSuccess)
                {
                    throw new Exception("Error al eliminar las fotos");
                }

                _dBContext.productos.Remove(producto);
                await _dBContext.SaveChangesAsync();

                await transaction.CommitAsync();

                ProductosDto response = new ProductosDto()
                {
                    Id = producto.Id,
                    Cantidad = producto.Cantidad,
                    Descripcion = producto.Descripcion,
                    Etiquetas = producto.ProductosEtiquetas.Select(x => new EtiquetasDto { Nombre = x.Etiquetas.Nombre }).ToList(),
                    Nombre = producto.Nombre,
                    Precio = producto.Precio,
                    Tipo = producto.Tipo,
                    Fotos = producto.Fotos.Select(pf => new FotosDto { Id = pf.Id, Url = pf.Url }).ToList(),
                };


                return new Response<ProductosDto>(response, "Producto eliminado con éxito");

            }
            catch(Exception ex)
            {
                await transaction.RollbackAsync();
                return new Response<ProductosDto>(ex.Message);
            }
        }
        private static List<FotosDto> FotosAEliminar(Productos producto, List<FotosDto> nuevasFotos)
        {
            var fotosActuales = producto.Fotos.Select(pf => new FotosDto
            {
                Id = pf.Id,
                Url = pf.Url
            }).ToList();

            // Identificar las fotos que ya no están en el request por su Id o Url
            var fotosAEliminar = fotosActuales.Where(fa => !nuevasFotos.Any(nf => nf.Id == fa.Id || nf.Url == fa.Url)).ToList();

            return new List<FotosDto>(fotosAEliminar);

        }
        private static List<EtiquetasDto> EtiquetasAEliminar(Productos producto, List<EtiquetasDto> nuevasEtiquetas)
        {
            var etiquetasActuales = producto.ProductosEtiquetas.Select(pe => new EtiquetasDto
            {
                Nombre = pe.Etiquetas.Nombre
            }).ToList();

            // Identificar las fotos que ya no están en el request por su Id o Url
            var etiquetasAEliminar = etiquetasActuales.Where(fa => !nuevasEtiquetas.Any(ne => ne.Nombre.ToLower().Trim() == fa.Nombre.ToLower().Trim())).ToList();

            return new List<EtiquetasDto>(etiquetasAEliminar);

        }

    }
}
