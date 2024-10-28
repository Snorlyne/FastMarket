using Domain.Dto;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Anuncios
    {
        [Key]
        public int Id { get; set; }
        public int IdPersona { get; set; }
        public Personas Personas { get; set; } = null!;
        public int IdProducto { get; set; }
        public Productos Productos { get; set; } = null!;
        public int IdLocalizacion { get; set; }
        public Localizaciones Localizacion { get; set; } = null!;
        [Required]
        public DateTime fecha_publicacion { get; set; }
        [Required]
        public DateTime fecha_expiracion { get; set; }
        [Required]
        public string Estado { get; set; }
        [Required]
        public decimal precio_anuncio { get; set; }
        public string Descripcion { get; set; }
        [Required]
        public string Tipo { get; set; }
        public virtual ICollection<Ofertas> Ofertas { get; set; } = new List<Ofertas>();
    }
}
