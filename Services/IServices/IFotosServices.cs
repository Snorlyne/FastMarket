using Common.Utilities;
using Domain.Dto;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface IFotosServices
    {
        Task<Response<List<Fotos>>> CrearFoto(List<FotosDto> request, int idProducto);
        Task<Response<List<Fotos>>> EliminarFoto(List<FotosDto> request);
    }
}
