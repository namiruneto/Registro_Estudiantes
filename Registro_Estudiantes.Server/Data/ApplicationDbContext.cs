using Microsoft.EntityFrameworkCore;
using Registro_Estudiantes.Server.Model.dto;
using System.Collections.Generic;

namespace Registro_Estudiantes.Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<LoginDto> Users { get; set; }
        public DbSet<MateriaDto> Materias { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Si MateriaDto es solo un DTO, indícalo como una entidad sin clave
            modelBuilder.Entity<MateriaDto>().HasNoKey();
        }
    }
}
