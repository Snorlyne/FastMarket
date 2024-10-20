using Common.Utilities;
using Domain.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface IPersonasServices
    {

        Task<IEnumerable<PersonasDto>> ObtenerPersonas();
        Task<PersonasDto> ObtenerPersonaPorId(int id);
        Task<Response<PersonasDto>> CrearPersona(PersonasDto personaDto);
        Task<bool> ActualizarPersona(int id, PersonasDto personaDto);
        Task<bool> EliminarPersona(int id);
    }
}
