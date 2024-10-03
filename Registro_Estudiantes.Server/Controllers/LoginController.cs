using Microsoft.AspNetCore.Mvc;
using Registro_Estudiantes.Server.Model.Request;
using Registro_Estudiantes.Server.Services;
using Registro_Estudiantes.Server.Utilitis;

namespace Registro_Estudiantes.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : Controller
    {
        private readonly AuthService _authService;

        public LoginController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] Login userLogin)
        {            
            if (_authService.ValidateUser(userLogin, out int IdUser))
            {               
                return Ok(new { Token = Token.GeneratorToken(userLogin.Username, IdUser) });
            }

            return Unauthorized("Usuario o contraseña incorrectos.");
        }
       
    }
}
