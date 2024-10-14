using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Localizaciones
    {
        [Key]
        public int Id { get; set; }
        public string Ciudad { get; set; }
        public string Estado { get; set; }
        public string Pais { get; set; }
        public string codigo_postal { get; set; }
        public decimal Latitud { get; set; }
        public decimal Longitud { get; set; }
    }
}
