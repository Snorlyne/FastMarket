using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto
{
    public class UsuariosDto
    {
        public int Id { get; set; }  
        public string Correo { get; set; }  
        public int IdRol { get; set; } 
    }

}
