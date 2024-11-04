using Domain.Dto;
namespace Services.IServices
{
    public interface IChatServices
    {
        Task<List<MensajesDto>> ObtenerUltimosMensajes(int idPersona);
        Task<List<MensajesDto>> ObtenerMensajesChat(int idPersona, int idOferta);
        Task<MensajesDto> EnviarMensaje(int idOferta, int idPersona, string contenido);

    }
}
