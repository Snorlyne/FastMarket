using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Dto;
using static Common.Utilities.Enums;
namespace Domain.Entities
{
    public class Productos
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(60)]
        public string Nombre { get; set; } = null!;

        [Required]
        public string Descripcion { get; set; } = null!;

        [Required]
        [Column(TypeName = "decimal(19,4)")]
        public decimal Precio { get; set; }

        [Required]
        public int Cantidad { get; set; }

        [Required]
        public string Tipo { get; set; } = null!;

        public ICollection<Fotos> Fotos { get; set; } = [];
        public virtual ICollection<Productos_Etiquetas> ProductosEtiquetas { get; set; } = [];

    }
}
