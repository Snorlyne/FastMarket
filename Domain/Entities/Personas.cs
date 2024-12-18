﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
   public class Personas
        {
        [Key]
        public int Id { get; set; } 
        public string Nombre { get; set; } 
        public string Apellido { get; set; }  
        public int IdUsuario { get; set; } 
        public Usuarios Usuario { get; set; }
        public virtual ICollection<Mensajes> Mensajes { get; set; }
    }

}
