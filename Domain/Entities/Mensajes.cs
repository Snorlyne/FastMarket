using Domain.Entities;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Domain.Entities

{
    public class Mensajes
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int IdOferta { get; set; }

        [Required]
        public int IdPersona { get; set; }

        [Required]
        public string Contenido { get; set; }

        [Column(TypeName = "timestamp")]
        public DateTime fecha_envio { get; set; } = DateTime.UtcNow;

        // Relaciones con otras entidades
        [ForeignKey("IdOferta")]
        public virtual Ofertas Oferta { get; set; }

        [ForeignKey("IdPersona")]
        public virtual Personas Persona { get; set; }
    }
}
