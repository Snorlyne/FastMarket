using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
   public class Usuarios
        {
        [Key]
        public int Id { get; set; } 
        public string Correo { get; set; } 
        public string Contraseña { get; set; }  
        public int IdRol { get; set; } 
        }

}
