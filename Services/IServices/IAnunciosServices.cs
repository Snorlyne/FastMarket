﻿using Common.Utilities;
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
        Task<Response<List<AnunciosDto>>> ObtenerAnunciosFiltrados
            (
                string? nombreProducto = null,
                string? etiquetas = null,
                string? ciudad = null,
                string? estado = null,
                string? pais = null,
                string? codigoPostal = null
            );
        Task<Response<List<AnunciosDto>>> ObtenerAnunciosUsuario(int idPersona);
        Task<Response<AnunciosDto>> CrearAnuncio(AnunciosCreateDto request, int idPersona);
        Task<Response<AnunciosDto>> ActualizarAnuncio(int id, AnunciosCreateDto request);
        Task<Response<AnunciosDto>> EliminarAnuncio(int id);
    }
}
;