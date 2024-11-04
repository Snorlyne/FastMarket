namespace Domain.Dto
{
    public class MensajesDto
    {
        public int Id { get; set; }
        public int IdOferta { get; set; }
        public int IdPersona { get; set; }
        public string Contenido { get; set; }
        public DateTime FechaEnvio { get; set; }
        public OfertasDto Oferta { get; set; }
        public PersonasDto Persona { get; set; }
        public string NombreChat { get; set; }
    }
    public class MensajesCreateDto
    {
        public string Contenido { get; set; }

    }

}
