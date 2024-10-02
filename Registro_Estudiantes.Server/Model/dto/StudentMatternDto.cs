using System.ComponentModel.DataAnnotations;

namespace Registro_Estudiantes.Server.Model.dto
{
    public class StudentMatternDto
    {
        [Key]
        public int EstudianteMateriaId { get; set; }
        public int EstudianteId { get; set; }
        public int MateriaId { get; set; }
    }
}
