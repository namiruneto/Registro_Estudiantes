using Registro_Estudiantes.Server.Model.dto;

namespace Registro_Estudiantes.Server.Model.answer
{
    public class Mattern
    {
        public List<MatternDetall> Materias { get; set; } = new List<MatternDetall>();
        public List<MatternDetall> StudentMatternDtos { get; set; } = new List<MatternDetall>();
    }
}
