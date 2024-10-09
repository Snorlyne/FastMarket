using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Etiquetas
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(25)]
        public string Nombre { get; set; } = null!;

        public virtual ICollection<Productos_Etiquetas> ProductosEtiquetas { get; set; } = [];

    }
}
