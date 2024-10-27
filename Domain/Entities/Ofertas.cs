using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Ofertas
    {
        public int Id { get; set; }
        public int idPersona { get; set; }
        public int idAnuncio { get; set; }
        public virtual Anuncios Anuncio { get; set; }
        public decimal monto { get; set; }
        public DateTime fecha_oferta { get; set; }
        public string estado { get; set; }
        public string Tipo { get; set; } = null!;
    }
}
