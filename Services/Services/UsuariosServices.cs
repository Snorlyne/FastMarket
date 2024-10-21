using Domain.Dto;
using Domain.Entities;
using Repository.Context;
using Services.IServices;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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

        // Cifrado de la contraseña en el método de creación de usuarios
        public async Task<UsuariosDto> CrearUsuario(UsuarioCreateDto usuarioDto)
        {
            var nuevoUsuario = new Usuarios
            {
                Correo = usuarioDto.Correo,
                IdRol = usuarioDto.IdRol
            };

            // Ciframos la contraseña antes de guardarla
            nuevoUsuario.Contraseña = _passwordHasher.HashPassword(nuevoUsuario, usuarioDto.Contraseña);

            _context.usuarios.Add(nuevoUsuario);
            await _context.SaveChangesAsync();

            return new UsuariosDto
            {
                Id = nuevoUsuario.Id,
                Correo = nuevoUsuario.Correo,
                IdRol = nuevoUsuario.IdRol
            };
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
