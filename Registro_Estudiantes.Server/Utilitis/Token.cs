using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Registro_Estudiantes.Server.Utilitis
{
    public class Token
    {
        public static string GeneratorToken(string username, int userId)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("R2LzksP8W4qQy39cLQ1Xj8a7b0pD10f5"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {   new Claim(ClaimTypes.Name, username),
                 new Claim("UserId", userId.ToString())
            };

            var token = new JwtSecurityToken(
                issuer: null,
                audience: null,
                claims: claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
