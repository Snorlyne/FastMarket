using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto
{
    public class UsuarioCreateDto
    {
        public string Correo { get; set; } 
        public string Contraseña { get; set; } 
        public int IdRol { get; set; } 
    }

}
