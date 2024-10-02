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

        public DbSet<StudentMatternDto> EstudiantesMaterias { get; set; }
        public DbSet<TeacherClassDto> Clases { get; set; }
        public DbSet<Student> Estudiantes { get; set; }
        public DbSet<TeacherDto> Profesores { get; set; }
    }
}
