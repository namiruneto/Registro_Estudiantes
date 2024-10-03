using Registro_Estudiantes.Server.Data;
using Registro_Estudiantes.Server.Model.Request;
using Registro_Estudiantes.Server.Repository;
using System.Text;

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
            string password = Convert.ToBase64String(Encoding.UTF8.GetBytes(userLogin.Password));
            var user = _context.Users.SingleOrDefault(u => u.Username == userLogin.Username && u.Password == password);
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
