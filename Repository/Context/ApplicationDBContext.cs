using Domain.Dto;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Repository.Context
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options) { }

        public virtual DbSet<Usuarios> usuarios { get; set; }
        public virtual DbSet<Productos> productos { get; set; }
        public virtual DbSet<Productos_Etiquetas> productos_etiquetas { get; set; }
        public virtual DbSet<Fotos> fotos { get; set; }
        public virtual DbSet<Etiquetas> etiquetas { get; set; }
        public virtual DbSet<Roles> roles { get; set; }
        public virtual DbSet<Personas> personas { get; set; }
        public virtual DbSet<Anuncios> anuncios { get; set; }
        public virtual DbSet<Localizaciones> localizaciones { get; set; }
        public virtual DbSet<Ofertas> ofertas { get; set; }
        public virtual DbSet<Ofertas_Productos> ofertas_productos { get; set; } // Agregar DbSet para Ofertas_Productos

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

            // Relación entre Anuncios y Localizaciones
            modelBuilder.Entity<Anuncios>()
                .HasOne(a => a.Localizacion)
                .WithOne()
                .HasForeignKey<Anuncios>(a => a.IdLocalizacion)
                .OnDelete(DeleteBehavior.Cascade);

            // Relación entre Anuncios y Personas
            modelBuilder.Entity<Anuncios>()
                .HasOne(a => a.Personas)
                .WithMany()
                .HasForeignKey(a => a.IdPersona);

            // Relación entre Anuncios y Productos
            modelBuilder.Entity<Anuncios>()
                .HasOne(a => a.Productos)
                .WithMany()
                .HasForeignKey(a => a.IdProducto);

            // Configuración de la relación entre Ofertas y Ofertas_Productos
            modelBuilder.Entity<Ofertas_Productos>()
                .HasKey(op => new { op.ofertas_id, op.productos_id });

            modelBuilder.Entity<Ofertas_Productos>()
                .HasOne(op => op.Ofertas)
                .WithMany(o => o.OfertasProductos)
                .HasForeignKey(op => op.ofertas_id);

            modelBuilder.Entity<Ofertas_Productos>()
                .HasOne(op => op.Producto)
                .WithMany() // Si no necesitas la relación inversa, puedes dejarlo así
                .HasForeignKey(op => op.productos_id);
        }
    }
}
