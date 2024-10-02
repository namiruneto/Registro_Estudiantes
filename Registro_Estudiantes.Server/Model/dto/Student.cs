using System.ComponentModel.DataAnnotations;

namespace Registro_Estudiantes.Server.Model.dto
{
    public class Student
    {
        [Key]
        public int EstudianteId { get; set; }
        public int UserId { get; set; }
        public string Nombre { get; set; }
        public string Email { get; set; }
        public DateTime FechaRegistro { get; set; }
    }
}
