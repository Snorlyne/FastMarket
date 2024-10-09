using Domain.Dto;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface IRegistroServices
    {
        Task<(UsuariosDto Usuario, PersonasDto Persona)> RegistrarUsuarioYPersona(RegistroDto registroDto);
    }
}
