using System.ComponentModel.DataAnnotations;

namespace Registro_Estudiantes.Server.Model.dto
{
    public class TeacherDto
    {
        [Key]
        public int ProfesorId { get; set; }
        public string Nombre { get; set; }
        public int Email { get; set; } 
    }
}
