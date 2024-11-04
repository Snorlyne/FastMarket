using Domain.Dto;
using Microsoft.EntityFrameworkCore;
using Repository.Context;
using Services.IServices;

namespace Services.Services
{
    public class VentasServices : IVentasServices
    {
        private readonly ApplicationDBContext _dBContext;

        public VentasServices(ApplicationDBContext dBContext) => _dBContext = dBContext;

        public async Task<List<AnunciosDto>> ObtenerAnunciosComprados(int idPersona)
        {
            var anunciosComprados = await _dBContext.ofertas
                .Include(a => a.Anuncio)
                .ThenInclude(anuncio => anuncio.Productos)
                    .ThenInclude(producto => producto.Fotos)
                .Include(a => a.OfertasProductos)
                    .ThenInclude(op => op.Producto)
                        .ThenInclude(p => p.Fotos)
                .Where(a => a.estado == "pagada" && a.idPersona == idPersona)
                .Select(a => new AnunciosDto
                {
                    Id = a.Anuncio.Id,
                    Descripcion = a.Anuncio.Descripcion,
                    precio_anuncio = a.Anuncio.precio_anuncio,
                    fecha_publicacion = a.Anuncio.fecha_publicacion,
                    Estado = a.Anuncio.Estado,
                    Productos = new ProductosDto
                    {
                        Id = a.Anuncio.Productos.Id,
                        Nombre = a.Anuncio.Productos.Nombre,
                        Descripcion = a.Anuncio.Productos.Descripcion,
                        Precio = a.Anuncio.Productos.Precio,
                        Cantidad = a.Anuncio.Productos.Cantidad,
                        Tipo = a.Anuncio.Productos.Tipo,
                        Fotos = a.Anuncio.Productos.Fotos.Select(f => new FotosDto
                        {
                            Id = f.Id,
                            Url = f.Url
                        }).ToList()
                    },
                    Ofertas = new List<OfertasDto>
                    {
                new()
                {
                    Id = a.Id,
                    idPersona = a.idPersona,
                    monto = a.monto,
                    estado = a.estado,
                    fecha_oferta = a.fecha_oferta,
                    Productos = a.OfertasProductos.Select(op => new ProductosDto
                    {
                        Id = op.Producto.Id,
                        Nombre = op.Producto.Nombre,
                        Descripcion = op.Producto.Descripcion,
                        Precio = op.Producto.Precio,
                        Cantidad = op.Producto.Cantidad,
                        Tipo = op.Producto.Tipo,
                        Fotos = op.Producto.Fotos.Select(f => new FotosDto
                        {
                            Id = f.Id,
                            Url = f.Url
                        }).ToList()
                    }).ToList()
                }
                    }
                })
                .ToListAsync();

            return anunciosComprados;
        }

        public async Task<List<AnunciosDto>> ObtenerAnunciosVendidos(int idPersona)
        {
            var anunciosPagados = await _dBContext.anuncios
                    .Include(a => a.Productos)
                        .ThenInclude(ap => ap.Fotos)
                    .Include(a => a.Ofertas)
                    .Where(a => a.Estado == "pagado" && a.IdPersona == idPersona)
                    .Select(a => new AnunciosDto
                    {
                        Id = a.Id,
                        Descripcion = a.Descripcion,
                        precio_anuncio = a.precio_anuncio,
                        fecha_publicacion = a.fecha_publicacion,
                        Estado = a.Estado,
                        Productos = new ProductosDto
                        {
                            Id = a.Productos.Id,
                            Nombre = a.Productos.Nombre,
                            Descripcion = a.Productos.Descripcion,
                            Precio = a.Productos.Precio,
                            Cantidad = a.Productos.Cantidad,
                            Tipo = a.Productos.Tipo,
                            Fotos = a.Productos.Fotos.Select(f => new FotosDto
                            {
                                Id = f.Id,
                                Url = f.Url
                            }).ToList()
                        },
                        Ofertas = a.Ofertas
                        .Where(o => o.estado == "pagado")
                        .Select(o => new OfertasDto
                        {
                            Id = o.Id,
                            idPersona = o.idPersona,
                            monto = o.monto,
                            estado = o.estado,
                            fecha_oferta = o.fecha_oferta
                        }).ToList()
                    })
                    .ToListAsync();

            return anunciosPagados;
        }
    }
}
