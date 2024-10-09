using System.ComponentModel.DataAnnotations;

namespace Domain.Dto
{
    public class RegistroDto
    {
        [Required]
        public string Correo { get; set; }

        [Required]
        public string Contraseña { get; set; }

        [Required]
        public string Nombre { get; set; }

        [Required]
        public string Apellido { get; set; }
    }
}
