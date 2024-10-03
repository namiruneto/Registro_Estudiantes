using Registro_Estudiantes.Server.Data;
using Registro_Estudiantes.Server.Model.Request;
using Registro_Estudiantes.Server.Repository;

namespace Registro_Estudiantes.Server.Services
{
    public class AuthService
    {
        private readonly ApplicationDbContext _context;

        public AuthService(ApplicationDbContext context)
        {
            _context = context;
        }

        public bool ValidateUser(Login userLogin, out int IdUser)
        {
            IdUser = 0;
            var user = _context.Users.SingleOrDefault(u => u.Username == userLogin.Username && u.Password == userLogin.Password);
            IdUser = user.Id;
            return user != null;
        }

        public bool ValidateUser(int UserId)
        {
            var user = _context.Users.SingleOrDefault(u => u.Id == UserId);
            return user != null;
        }
    }
}
