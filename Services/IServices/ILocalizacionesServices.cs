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
    public interface ILocalizacionesServices
    {
        Task<Response<Localizaciones>> CrearLocalizacion(LocalizacionesDto request);
        Task<Response<Localizaciones>> ActualizarLocalizacion(int id, LocalizacionesDto request);
        Task<Response<Localizaciones>> EliminarLocalizacion(int id);
    }
}
