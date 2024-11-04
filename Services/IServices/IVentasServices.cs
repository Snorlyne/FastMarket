using Domain.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface IVentasServices
    {
        Task<List<AnunciosDto>> ObtenerAnunciosComprados(int idPersona);
        Task<List<AnunciosDto>> ObtenerAnunciosVendidos(int idPersona);
    }
}
