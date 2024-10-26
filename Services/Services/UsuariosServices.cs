using Domain.Dto;
using Domain.Entities;
using Repository.Context;
using Services.IServices;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Common.Utilities;
using Microsoft.AspNetCore.Identity;

namespace Services.Services
{
    public class UsuariosServices : IUsuariosServices
    {
        private readonly ApplicationDBContext _context;
        private readonly PasswordHasher<Usuarios> _passwordHasher;

        public UsuariosServices(ApplicationDBContext context)
        {
            _context = context;
            _passwordHasher = new PasswordHasher<Usuarios>();
        }

        // Implementación de ValidarUsuario con comparación de contraseñas cifradas
        public async Task<UsuariosDto> ValidarUsuario(string correo, string contraseña)
        {
            var usuario = await _context.usuarios
                .SingleOrDefaultAsync(u => u.Correo == correo);

            if (usuario == null) return null;

            // Verificamos si la contraseña ingresada coincide con la almacenada
            var resultado = _passwordHasher.VerifyHashedPassword(usuario, usuario.Contraseña, contraseña);
            if (resultado == PasswordVerificationResult.Failed) return null;

            return new UsuariosDto
            {
                Id = usuario.Id,
                Correo = usuario.Correo,
                IdRol = usuario.IdRol
            };
        }

        public async Task<string> ObtenerNombreRolPorId(int idRol)
        {
            var rol = await _context.roles.FindAsync(idRol);
            return rol?.Nombre;
        }

        public async Task<IEnumerable<UsuariosDto>> ObtenerUsuarios()
        {
            return await _context.usuarios
                .Select(u => new UsuariosDto
                {
                    Id = u.Id,
                    Correo = u.Correo,
                    IdRol = u.IdRol
                }).ToListAsync();
        }

        public async Task<UsuariosDto> ObtenerUsuarioPorId(int id)
        {
            var usuario = await _context.usuarios.FindAsync(id);
            if (usuario == null) return null;

            return new UsuariosDto
            {
                Id = usuario.Id,
                Correo = usuario.Correo,
                IdRol = usuario.IdRol
            };
        }

        public async Task<Response<UsuariosDto>> CrearUsuario(UsuarioCreateDto usuarioDto)
        {
            try
            {
                // Validaciones básicas
                if (string.IsNullOrEmpty(usuarioDto.Correo))
                {
                    throw new Exception("El correo es requerido.");
                }

                if (string.IsNullOrEmpty(usuarioDto.Contraseña))
                {
                    throw new Exception("La contraseña es requerida.");
                }

                // Verificar si el correo ya existe
                var usuarioExistente = await _context.usuarios
                    .FirstOrDefaultAsync(u => u.Correo == usuarioDto.Correo);

                if (usuarioExistente != null)
                {
                    throw new Exception("Ya existe un usuario con este correo.");
                }

                // Crear el nuevo usuario
                var nuevoUsuario = new Usuarios
                {
                    Correo = usuarioDto.Correo,
                    Contraseña = usuarioDto.Contraseña,
                    IdRol = usuarioDto.IdRol
                };

                // Agregar usuario al contexto y guardar cambios
                _context.usuarios.Add(nuevoUsuario);
                await _context.SaveChangesAsync();

                // Devolver el usuario creado como DTO
                var usuarioDtoCreado = new UsuariosDto
                {
                    Id = nuevoUsuario.Id,
                    Correo = nuevoUsuario.Correo,
                    IdRol = nuevoUsuario.IdRol
                };

                return new Response<UsuariosDto>(usuarioDtoCreado, "Usuario creado exitosamente.");
            }
            catch (Exception ex)
            {
                // Lanza la excepción con el mensaje de error
                throw new Exception($"Error al crear el usuario: {ex.Message}");
            }
        }


        public async Task<bool> ActualizarUsuario(int id, UsuariosDto usuarioDto)
        {
            var usuario = await _context.usuarios.FindAsync(id);
            if (usuario == null) return false;

            usuario.Correo = usuarioDto.Correo;
            usuario.IdRol = usuarioDto.IdRol;

            _context.Entry(usuario).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> EliminarUsuario(int id)
        {
            var usuario = await _context.usuarios.FindAsync(id);
            if (usuario == null) return false;

            _context.usuarios.Remove(usuario);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
