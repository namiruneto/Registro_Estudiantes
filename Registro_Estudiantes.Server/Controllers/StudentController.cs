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

namespace Registro_Estudiantes.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : Controller
    {

        private readonly ApplicationDbContext _context;

        public StudentController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("AvailableMaterial")]
        public IActionResult AvailableMaterial([FromBody] AvailableMaterial userLogin)
        {
            //if (_auth.ValidateUser(userLogin))
            //{
            var materias = _context.Materias
   .Select(m => new MateriaDto
   {
       MateriaId = m.MateriaId,
       Nombre = m.Nombre,
       Creditos = m.Creditos
   }).ToList();

            return Ok(materias);


            //}

            //return null;
        }
    }
}
