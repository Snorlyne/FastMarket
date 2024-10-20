using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Fotos
    {
        [Key]
        public int Id { get; set; }

        public DateTime Fecha { get; set; } = DateTime.Now;

        [Required]
        public string Url { get; set; } = null!;
        public int IdProducto { get; set; }  // Clave foránea hacia Producto
        public Productos Producto { get; set; } = null!;  // Navegación a Producto
    }
}
