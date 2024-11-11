using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
   
    public class Productos_Etiquetas
    {
        public int productos_Id { get; set; }
        public virtual Productos Producto { get; set; } = null!;

        public int etiquetas_id { get; set; }
        public virtual Etiquetas Etiquetas { get; set; } = null!;
    }
}
