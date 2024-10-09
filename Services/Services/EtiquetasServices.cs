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
    public class EtiquetasServices : IEtiquetasServices
    {
        private readonly ApplicationDBContext _dBContext;

        public EtiquetasServices(ApplicationDBContext dBContext)
        {
            _dBContext = dBContext;
        }

        public async Task<Response<List<Etiquetas>>> Anexar(List<EtiquetasDto> request)
        {
            try
            {
                List<Etiquetas> etiquetas = new();
                foreach (var item in request) 
                {
                    Etiquetas  etiqueta = await _dBContext.etiquetas.FirstOrDefaultAsync(x => x.Nombre.ToLower().Trim() == item.Nombre.ToLower().Trim());
                    if (etiqueta == null)
                    {
                        Etiquetas newEtiqueta = new()
                        {
                            Nombre = item.Nombre,
                        };
                        await _dBContext.AddAsync(newEtiqueta);
                        await _dBContext.SaveChangesAsync();

                        etiquetas.Add(newEtiqueta);
                    }
                    else
                    {
                        etiquetas.Add(etiqueta);
                    }
                }

                return new Response<List<Etiquetas>>(etiquetas, "Fotos creadas con éxito.");

            }
            catch (Exception ex) 
            {
                return new Response<List<Etiquetas>>(ex.Message);
            }
        }
    }
}
