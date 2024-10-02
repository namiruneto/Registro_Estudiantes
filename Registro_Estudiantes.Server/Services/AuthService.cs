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
            return user != null; // Retorna true si se encontró un usuario
        }

        public bool ValidateUser(AvailableMaterial availableMaterial)
        {
            var user = _context.Users.SingleOrDefault(u => u.Id == availableMaterial.Username);
            return user != null; // Retorna trueSingleOrDefault si se encontró un usuario
        }
    }
}
