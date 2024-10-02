using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Registro_Estudiantes.Server.Model.Request;
using Registro_Estudiantes.Server.Model.dto;
using Registro_Estudiantes.Server.Services;

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
                // Generar y retornar el token aquí
                return Ok(new { Token = GenerateToken(userLogin.Username, IdUser) }); // Reemplaza con el token real
            }

            return Unauthorized("Usuario o contraseña incorrectos.");
        }

        private string GenerateToken(string username, int userId)
        {
            // Asegúrate de que la clave tenga al menos 32 bytes
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("R2LzksP8W4qQy39cLQ1Xj8a7b0pD10f5")); // Cambia esta clave a una más segura
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {   new Claim(ClaimTypes.Name, username), // El nombre de usuario
                 new Claim("UserId", userId.ToString())
            };

            var token = new JwtSecurityToken(
                issuer: null,
                audience: null,
                claims: claims,
                expires: DateTime.Now.AddMinutes(60), // Token expira en 60 minutos
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
