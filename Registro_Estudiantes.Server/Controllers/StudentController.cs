using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Registro_Estudiantes.Server.Model.Request;
using Registro_Estudiantes.Server.Model.dto;
using Registro_Estudiantes.Server.Services;
using Microsoft.EntityFrameworkCore;
using Registro_Estudiantes.Server.Data;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Registro_Estudiantes.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : Controller
    {

        private readonly ApplicationDbContext _context;
        private readonly AuthService _authService;

        public StudentController(ApplicationDbContext context, AuthService authUser)
        {
            _context = context;
            _authService = authUser;
        }

        [HttpPost("AvailableMaterial")]
        public IActionResult AvailableMaterial([FromBody] AvailableMaterial userLogin)
        {
            if (_authService.ValidateUser(userLogin.Username))
            {
                SubjectMatter matter = new SubjectMatter(_context);
                return Ok(matter.GetMattern(userLogin.Username));
            }
            return null;
        }

        [HttpPost("RegisterMattern")]
        public IActionResult RegisterMattern([FromBody] RegisterMattern register)
        {
            if (_authService.ValidateUser(register.UserId))
            {
                SubjectMatter matter = new SubjectMatter(_context);
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
                SubjectMatter matter = new SubjectMatter(_context);
                return Ok(matter.RemoveMatternUser(register));
            }
            return null;
        }


        [HttpPost("SignMattern")]
        public IActionResult SignMattern([FromBody] AvailableMaterial sing)
        {
            if (_authService.ValidateUser(sing.Username))
            {
                SubjectMatter matter = new SubjectMatter(_context);
                return Ok(matter.SignMattern(sing.Username));
            }
            return null;
        }
    }
}
