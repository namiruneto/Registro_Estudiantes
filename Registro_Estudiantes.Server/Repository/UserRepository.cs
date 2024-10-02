using Registro_Estudiantes.Server.Data;
using Registro_Estudiantes.Server.Model.dto;

namespace Registro_Estudiantes.Server.Repository
{
    public class UserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public LoginDto GetUserByUsername(string username)
        {
            return _context.Users.SingleOrDefault(u => u.Username == username);
        }
    }
}
