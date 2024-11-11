using Common.Utilities;
using Domain.Dto;
using Repository.Context;
using Services.IServices;
using System.Threading.Tasks;

namespace Services.Services
{
    public class RegistroServices : IRegistroServices
    {
        private readonly IUsuariosServices _usuariosServices;
        private readonly ApplicationDBContext _dBContext;
        private readonly IPersonasServices _personasServices;

        public RegistroServices(ApplicationDBContext dBContext, IUsuariosServices usuariosServices, IPersonasServices personasServices)
        {
            _dBContext = dBContext;
            _usuariosServices = usuariosServices;
            _personasServices = personasServices;
        }

        public async Task<Response<(UsuariosDto Usuario, PersonasDto Persona)>> RegistrarUsuarioYPersona(RegistroDto registroDto)
        {
            using var transaction = await _dBContext.Database.BeginTransactionAsync();

            try
            {
                // Crear el nuevo usuario
                var usuarioCreateDto = new UsuarioCreateDto
                {
                    Correo = registroDto.Correo,
                    Contraseña = registroDto.Contraseña,
                    IdRol = 1 // Asignar el rol predeterminado
                };

                // Llamar al servicio para crear el usuario
                var usuarioCreado = await _usuariosServices.CrearUsuario(usuarioCreateDto);
                if (!usuarioCreado.IsSuccess)
                {
                    throw new Exception();
                }

                // Crear la nueva persona vinculada al usuario
                var personaDto = new PersonasDto
                {
                    Nombre = registroDto.Nombre,
                    Apellido = registroDto.Apellido,
                    IdUsuario = usuarioCreado.Result.Id // Usar el ID del usuario recién creado
                };

                // Llamar al servicio para crear la persona
                var personaCreada = await _personasServices.CrearPersona(personaDto);
                if (!personaCreada.IsSuccess)
                {
                    throw new Exception();
                }

                // Devolver la respuesta exitosa con el usuario y persona creados
                await transaction.CommitAsync();
                return new Response<(UsuariosDto, PersonasDto)>((usuarioCreado.Result, personaCreada.Result), "Registro exitoso.");
            }
            catch (Exception ex)
            {
                // Manejar cualquier excepción y devolver un error con el mensaje de la excepción
                await transaction.RollbackAsync();
                return new Response<(UsuariosDto, PersonasDto)>($"Error en el proceso de registro: {ex.Message}");
            }
        }
    }
}
