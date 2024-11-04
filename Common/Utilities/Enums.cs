using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Utilities
{
    public class Enums
    {
        public enum TipoProducto
        {
            [Display(Name = "Venta")]
            venta,
            [Display(Name = "Oferta")]
            oferta
        }
        public enum EstadoOferta
        {
            Activa,
            Rechazada,
            Aceptada,
            Cancelada,
            Pagada
        }
    }
}
