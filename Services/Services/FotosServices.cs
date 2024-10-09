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
    public class FotosServices : IFotosServices
    {
        private readonly ApplicationDBContext _dBContext;

        public FotosServices(ApplicationDBContext dBContext)
        {
            _dBContext = dBContext;
        }

        public async Task<Response<List<Fotos>>> CrearFoto(List<FotosDto> request, int idProducto)
        {
            try
            {
                List<Fotos> fotos = new();
                foreach (var item in request) 
                {
                    Fotos foto = await _dBContext.fotos.FirstOrDefaultAsync(x => (x.Url == item.Url || x.Id == item.Id) && x.IdProducto == idProducto);
                    if (foto == null)
                    {
                        Fotos newFoto = new()
                        {
                            Url = item.Url,
                            IdProducto = idProducto,
                        };
                        await _dBContext.AddAsync(newFoto);
                        await _dBContext.SaveChangesAsync();
                        fotos.Add(newFoto);
                    }
                }

                return new Response<List<Fotos>>(fotos, "Fotos creadas con éxito.");

            }
            catch (Exception ex) 
            {
                return new Response<List<Fotos>>(ex.Message);
            }
        }
        public async Task<Response<List<Fotos>>> EliminarFoto(List<FotosDto> request)
        {
            try
            {
                List<Fotos> fotos = new();
                foreach (var item in request) 
                {
                    Fotos foto = await _dBContext.fotos.FirstOrDefaultAsync(x => x.Url == item.Url || x.Id == item.Id);
                    if (foto != null)
                    {
                        _dBContext.Remove(foto);
                        await _dBContext.SaveChangesAsync();
                        fotos.Add(foto);
                    }
                }

                return new Response<List<Fotos>>(fotos, "Fotos eliminadas con éxito.");

            }
            catch (Exception ex) 
            {
                return new Response<List<Fotos>>(ex.Message);
            }
        }
    }
}
