using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

        // Inicializa correctamente las colecciones
        public ICollection<Fotos> Fotos { get; set; } = new List<Fotos>();
        public virtual ICollection<Productos_Etiquetas> ProductosEtiquetas { get; set; } = new List<Productos_Etiquetas>();
    }
}
