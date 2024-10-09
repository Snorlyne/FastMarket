using Common.Utilities;
using Domain.Dto;
using Domain.Entities;

namespace Services.IServices
{
    public interface IProductosServices
    {
        Task<Response<List<ProductosDto>>> ObtenerProductos();
        Task<Response<ProductosDto>> ObtenerProducto(int id);
        Task<Response<ProductosDto>> CrearProducto(ProductosDto request);
        Task<Response<ProductosDto>> ActualizarProducto(int id, ProductosDto request);
        Task<Response<ProductosDto>> EliminarProducto(int id);
    }
}
