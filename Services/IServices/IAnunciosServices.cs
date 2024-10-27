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
    public interface IAnunciosServices
    {
        Task<Response<List<AnunciosDto>>> ObtenerAnuncios();
        Task<Response<AnunciosDto>> ObtenerAnuncio(int id, int idPersona);
        Task<Response<List<AnunciosDto>>> ObtenerAnunciosUsuario(int idPersona);
        Task<Response<AnunciosDto>> CrearAnuncio(AnunciosDto request, int idPersona);
        Task<Response<AnunciosDto>> ActualizarAnuncio(int id, AnunciosDto request);
        Task<Response<AnunciosDto>> EliminarAnuncio(int id);
    }
}
