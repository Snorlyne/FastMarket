using Common.Utilities;
using Domain.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface IOfertasServices
    {
        Task<Response<List<OfertasDto>>> ObtenerOfertas();
        Task<Response<OfertasDto>> ObtenerOferta(int id);
        //Task<Response<OfertasDto>> CrearOferta(OfertasDto request, List<int> productoIds); 
        //Task<Response<OfertasDto>> ActualizarOferta(int id, OfertasDto request, List<int> productoIds);
        Task<Response<List<OfertasDto>>> ObtenerOfertasUsuario(int idPersona);
        //Task<Response<OfertasDto>> CrearOferta(OfertasDto request);
        //Task<Response<OfertasDto>> ActualizarOferta(int id, OfertasDto request);
        Task<Response<OfertasDto>> EliminarOferta(int id);
    }
}
