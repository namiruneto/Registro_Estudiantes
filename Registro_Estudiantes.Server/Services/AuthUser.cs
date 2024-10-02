using Registro_Estudiantes.Server.Data;
using Registro_Estudiantes.Server.Model.dto;
using Registro_Estudiantes.Server.Model.Request;
using Registro_Estudiantes.Server.Repository;

namespace Registro_Estudiantes.Server.Services
{
    public class AuthUser
    {
        private readonly ApplicationDbContext _context;

        public AuthUser(ApplicationDbContext context)
        {
            _context = context;
        }



        //public List<MateriaDto> Materias()
        //{
        //    return _context.Materias.Wh;
        //}
    }
}
