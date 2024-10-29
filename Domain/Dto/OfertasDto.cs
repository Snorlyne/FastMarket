using System;

namespace Domain.Dto
{
    public class OfertasDto
    {
        public int Id { get; set; }
        public int idPersona { get; set; }
        public int idAnuncio { get; set; }
        public decimal monto { get; set; }
        public DateTime fecha_oferta { get; set; }
        public string estado { get; set; }
        public string Tipo { get; set; } = null!; // Asegúrate de que esto esté en minúsculas
    }
}
