using Microsoft.AspNetCore.Mvc;
using Registro_Estudiantes.Server.Model.Request;
using Registro_Estudiantes.Server.Services;
using Registro_Estudiantes.Server.Data;

namespace Registro_Estudiantes.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : Controller
    {

        private readonly ApplicationDbContext _context;
        private readonly AuthService _authService;
        private readonly SubjectMatter matter;

        public StudentController(ApplicationDbContext context, AuthService authUser)
        {
            _context = context;
            _authService = authUser;
            matter = new SubjectMatter(_context);
        }

        [HttpPost("AvailableMaterial")]
        public IActionResult AvailableMaterial([FromBody] AvailableMaterial userLogin)
        {
            if (_authService.ValidateUser(userLogin.Username))
            {
                return Ok(matter.GetMattern(userLogin.Username));
            }
            return null;
        }

        [HttpPost("RegisterMattern")]
        public IActionResult RegisterMattern([FromBody] RegisterMattern register)
        {
            if (_authService.ValidateUser(register.UserId))
            {
                if (matter.RegisterMatternUser(register, out string Message))
                {
                    return Ok(true);
                }
                return BadRequest(new { message = Message });
                
            }
            return BadRequest();
        }

        [HttpDelete("RemoveMattern")]
        public IActionResult RemoveMattern([FromBody] RegisterMattern register)
        {
            if (_authService.ValidateUser(register.UserId))
            {
                return Ok(matter.RemoveMatternUser(register));
            }
            return null;
        }


        [HttpPost("SignMattern")]
        public IActionResult SignMattern([FromBody] AvailableMaterial sing)
        {
            if (_authService.ValidateUser(sing.Username))
            {
                return Ok(matter.SignMattern(sing.Username));
            }
            return null;
        }

        [HttpPost("InfoRegisterClass")]
        public IActionResult InfoRegisterClass([FromBody] RegisterMattern register)
        {
            if (_authService.ValidateUser(register.UserId))
            {
                return Ok(matter.InfoRegisterClass(register.MatternId));
            }
            return null;
        }

        [HttpPost("InfoNameStuden")]
        public IActionResult InfoNameStuden([FromBody] InfoStudent register)
        {
            if (_authService.ValidateUser(register.UserId))
            {
                return Ok(new { name = matter.InfoNameStuden(register.IdStudent) });
            }
            return null;
        }
    }
}
