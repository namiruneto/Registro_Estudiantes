using Registro_Estudiantes.Server.Model.dto;

namespace Registro_Estudiantes.Server.Model.answer
{
    public class HistorialCasos
    {
        public List<CasesDto> Cases { get; set; }
        public List<CaseSolutionsDto> Solutions { get; set; }
    }
}
