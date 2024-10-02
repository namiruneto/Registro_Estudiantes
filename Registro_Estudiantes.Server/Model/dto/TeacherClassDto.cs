using System.ComponentModel.DataAnnotations;

namespace Registro_Estudiantes.Server.Model.dto
{
    public class TeacherClassDto
    {
        [Key]
        public int ClaseId { get; set; }
        public int MateriaId { get; set; }
        public int ProfesorId { get; set; }
    }
}
