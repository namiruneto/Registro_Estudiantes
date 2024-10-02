using System.ComponentModel.DataAnnotations;

namespace Registro_Estudiantes.Server.Model.dto
{
    public class LoginDto
    {
        [Key]
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; } 

    }
}
