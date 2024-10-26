using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Ofertas_Productos
    {
        public int ofertas_id { get; set; }
        public virtual Ofertas Ofertas { get; set; } = null!;
        public int productos_id { get; set; }
        public virtual Productos Producto { get; set; } = null!;
    }
}
