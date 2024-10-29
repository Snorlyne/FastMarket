using Common.Utilities;
using Domain.Dto;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface IOfertasServices
    {
        Task<Response<List<OfertasDto>>> ObtenerOfertas();
        Task<Response<OfertasDto>> ObtenerOferta(int id);
        Task<Response<OfertasDto>> CrearOferta(OfertasDto request, List<ProductosDto> productos); // Cambiado para aceptar nuevos productos
        Task<Response<OfertasDto>> ActualizarOferta(int id, OfertasDto request, List<ProductosDto> productos); // Cambiado para aceptar nuevos productos
        Task<Response<OfertasDto>> EliminarOferta(int id);
    }
}
