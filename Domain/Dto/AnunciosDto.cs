﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto
{
    public class AnunciosDto
    {
        public int Id { get; set; }
        public PersonasDto? Personas { get; set; }
        public ProductosDto Productos { get; set; } = null!;
        public LocalizacionesDto Localizacion { get; set; } = null!;
        public OfertasDto Ofertas { get; set; } = null!;
        public DateTime fecha_publicacion { get; set; }
        public DateTime fecha_expiracion { get; set; }
        public string Estado { get; set; }
        public decimal precio_anuncio { get; set; }
        public string Descripcion { get; set; } = null!;
        public string Tipo { get; set; }

    }
}