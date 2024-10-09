using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Common.Utilities.Enums;

namespace Domain.Dto
{
    public class ProductosDto
    {
        public int Id { get; set; }

        public string Nombre { get; set; } = null!;

        public string Descripcion { get; set; } = null!;

        public decimal Precio { get; set; }

        public int Cantidad { get; set; }

        public string Tipo { get; set; } = null!;

        public List<FotosDto> Fotos { get; set; } = [];
        public List<EtiquetasDto> Etiquetas { get; set; } = [];
    }
}
