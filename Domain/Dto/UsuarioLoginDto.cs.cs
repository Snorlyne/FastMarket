using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto
{
    public class UsuarioLoginDto
    {
        [Required]
        public string Correo { get; set; } = string.Empty; // Valor predeterminado para string

        [Required]
        public string Contraseña { get; set; } = string.Empty; // Valor predeterminado para string
    }
}
