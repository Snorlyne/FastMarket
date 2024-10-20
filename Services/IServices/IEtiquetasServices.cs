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
    public interface IEtiquetasServices
    {
        Task<Response<List<Etiquetas>>> Anexar(List<EtiquetasDto> request);
    }
}
