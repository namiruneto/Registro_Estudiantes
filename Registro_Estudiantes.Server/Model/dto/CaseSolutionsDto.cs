using System.ComponentModel.DataAnnotations;

namespace Registro_Estudiantes.Server.Model.dto
{
    public class CaseSolutionsDto
    {
        [Key]
        public int Id { get; set; }
        public int caseId { get; set; }
        public string solution { get; set; }
        public string status { get; set; }
    }
}
