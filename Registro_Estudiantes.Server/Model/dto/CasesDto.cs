using System.ComponentModel.DataAnnotations;

namespace Registro_Estudiantes.Server.Model.dto
{
    public class CasesDto
    {
        [Key]
        public int id { get; set; }
        public string title { get; set; }
        public string problem { get; set; }
        public string appliedSolution { get; set; } = string.Empty;
        public bool Activo { get; set; }

    }
}
