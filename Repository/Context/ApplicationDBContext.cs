using Domain.Dto;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Repository.Context
{
    public class ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : DbContext(options)
    {
        public virtual DbSet<Usuarios> usuarios { get; set; }
        public virtual DbSet<Productos> productos { get; set; }
        public virtual DbSet<Productos_Etiquetas> productos_etiquetas { get; set; }
        public virtual DbSet<Fotos> fotos { get; set; }
        public virtual DbSet<Etiquetas> etiquetas { get; set; }
        public virtual DbSet<Roles> roles { get; set; }
        public virtual DbSet<Personas> personas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            // Configuración de clave compuesta para Productos_etiquetas
            modelBuilder.Entity<Productos_Etiquetas>()
                .HasKey(pf => new { pf.productos_Id, pf.etiquetas_id });

            // Configuración de la relación entre Producto y Productos_etiquetas
            modelBuilder.Entity<Productos_Etiquetas>()
                .HasOne(pf => pf.Producto)
                .WithMany(p => p.ProductosEtiquetas)
                .HasForeignKey(pf => pf.productos_Id);

            // Configuración de la relación entre Etiquetas y Productos_etiquetas
            modelBuilder.Entity<Productos_Etiquetas>()
                .HasOne(pf => pf.Etiquetas)
                .WithMany(f => f.ProductosEtiquetas)
                .HasForeignKey(pf => pf.etiquetas_id);

            modelBuilder.Entity<Productos>()
                .HasMany(p => p.Fotos)
                .WithOne(f => f.Producto)
                .HasForeignKey(f => f.IdProducto)
                .OnDelete(DeleteBehavior.Cascade);  // Cascada para eliminar las fotos cuando se elimina un producto

        }
    }
}
