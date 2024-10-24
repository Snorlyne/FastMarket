using Common.Utilities;
using Domain.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface IUsuariosServices
    {

        Task<IEnumerable<UsuariosDto>> ObtenerUsuarios();
        Task<UsuariosDto> ObtenerUsuarioPorId(int id);
        Task<Response<UsuariosDto>> CrearUsuario(UsuarioCreateDto usuarioDto);
        Task<bool> ActualizarUsuario(int id, UsuariosDto usuarioDto);
        Task<bool> EliminarUsuario(int id);
        Task<UsuariosDto> ValidarUsuario(string correo, string contraseña);
        Task<string> ObtenerNombreRolPorId(int idRol);
    }
}
