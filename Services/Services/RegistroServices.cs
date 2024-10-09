using Domain.Dto;
using Services.IServices;
using System.Threading.Tasks;

namespace Services.Services
{
    public class RegistroServices : IRegistroServices
    {
        private readonly IUsuariosServices _usuariosServices;
        private readonly IPersonasServices _personasServices;

        public RegistroServices(IUsuariosServices usuariosServices, IPersonasServices personasServices)
        {
            _usuariosServices = usuariosServices;
            _personasServices = personasServices;
        }

        public async Task<(UsuariosDto Usuario, PersonasDto Persona)> RegistrarUsuarioYPersona(RegistroDto registroDto)
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
            if (usuarioCreado == null)
            {
                throw new System.Exception("No se pudo crear el usuario.");
            }

            // Crear la nueva persona vinculada al usuario
            var personaDto = new PersonasDto
            {
                Nombre = registroDto.Nombre,
                Apellido = registroDto.Apellido,
                IdUsuario = usuarioCreado.Id // Usar el ID del usuario recién creado
            };

            // Llamar al servicio para crear la persona
            var personaCreada = await _personasServices.CrearPersona(personaDto);
            if (personaCreada == null)
            {
                throw new System.Exception("No se pudo crear la persona.");
            }

            return (usuarioCreado, personaCreada);
        }
    }
}
