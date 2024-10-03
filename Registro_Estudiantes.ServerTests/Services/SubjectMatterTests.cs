using Microsoft.EntityFrameworkCore;
using Registro_Estudiantes.Server.Data;
using Registro_Estudiantes.Server.Model.answer;
using Registro_Estudiantes.Server.Model.dto;
using Registro_Estudiantes.Server.Model.Request;
using Registro_Estudiantes.Server.Repository;
using Registro_Estudiantes.Server.Services;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace Registro_Estudiantes.ServerTests
{
    public class SubjectMatterTests
    {
        private readonly ApplicationDbContext _context;
        private readonly SubjectMatter _service;

        public SubjectMatterTests()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "Server=localhost;Database=registroestudiantes;User=root;Password=12345678;Port=3306;")
                .Options;

            _context = new ApplicationDbContext(options);
            SeedDatabase();
            _service = new SubjectMatter(_context);
        }

        private void SeedDatabase()
        {
            var estudiantes = new List<Student>
    {
        new Student { EstudianteId = 1, UserId = 1, Nombre = "Estudiante 1", Email = "estudiante1@example.com" },
        new Student { EstudianteId = 2, UserId = 2, Nombre = "Estudiante 2", Email = "estudiante2@example.com" }
    };

            var materias = new List<MateriaDto>
            {
                new MateriaDto { MateriaId = 1, Nombre = "Materia 1", Creditos = 3 },
                new MateriaDto { MateriaId = 2, Nombre = "Materia 2", Creditos = 4 }
            };

            var profesores = new List<TeacherDto>
            {
                new TeacherDto { ProfesorId = 1, Nombre = "Profesor 1" },
                new TeacherDto { ProfesorId = 2, Nombre = "Profesor 2" }
            };

            var clases = new List<TeacherClassDto>
            {
                new TeacherClassDto {  ClaseId = 1, MateriaId = 1, ProfesorId = 1 },
                new TeacherClassDto { ClaseId = 2, MateriaId = 2, ProfesorId = 2 }
            };

            _context.Estudiantes.AddRange(estudiantes);
            _context.Materias.AddRange(materias);
            _context.Profesores.AddRange(profesores);
            _context.Clases.AddRange(clases);
            _context.SaveChanges();
        }

        [Fact]
        public void GetMattern_ReturnsCorrectMattern()
        {
            // Arrange
            int studentId = 1;

            // Act
            Mattern result = _service.GetMattern(studentId);

            // Assert
            Xunit.Assert.NotNull(result);
            Xunit.Assert.Equal(2, result.Materias.Count); 
        }

        [Fact]
        public void RegisterMatternUser_RegistersMatternSuccessfully()
        {
            // Arrange
            var register = new RegisterMattern { UserId = 1, MatternId = 1 };
            string message;

            // Act
            bool result = _service.RegisterMatternUser(register, out message);

            // Assert
            Xunit.Assert.True(result);
            Xunit.Assert.Equal("", message);
            Xunit.Assert.Equal(1, _context.EstudiantesMaterias.Count()); // Debería haber 1 registro
        }

        [Fact]
        public void RemoveMatternUser_RemovesMatternSuccessfully()
        {
            // Arrange
            var register = new RegisterMattern { UserId = 1, MatternId = 1 };
            string message;
            _service.RegisterMatternUser(register, out message); // Primero registrar

            // Act
            bool result = _service.RemoveMatternUser(register);

            // Assert
            Xunit.Assert.True(result);
            Xunit.Assert.Equal(0, _context.EstudiantesMaterias.Count()); // Debería estar vacío
        }

        [Fact]
        public void InfoRegisterClass_ReturnsRegisteredStudents()
        {
            // Arrange
            var register = new RegisterMattern { UserId = 1, MatternId = 1 };
            _service.RegisterMatternUser(register, out _); // Registrar una materia

            // Act
            var result = _service.InfoRegisterClass(1); // Obtener estudiantes registrados en la materia

            // Assert
            Xunit.Assert.Single(result);
            Xunit.Assert.Equal("Estudiante 1", result.First().NameStudent); // Debería devolver "Estudiante 1"
        }

        [Fact]
        public void InfoNameStuden_ReturnsStudentName()
        {
            // Arrange
            int studentId = 1;

            // Act
            string result = _service.InfoNameStuden(studentId);

            // Assert
            Xunit.Assert.Equal("Estudiante 1", result); // Debería devolver "Estudiante 1"
        }
    }
}
