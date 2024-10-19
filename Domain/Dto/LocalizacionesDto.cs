using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto
{
    public class LocalizacionesDto
    {
        public int Id { get; set; }
        public string Ciudad { get; set; }
        public string Estado { get; set; }
        public string Pais { get; set; }
        public string CodigoPostal { get; set; }
        public decimal Latitud { get; set; }
        public decimal Longitud { get; set; }
    }
}
