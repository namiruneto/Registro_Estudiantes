using System.ComponentModel.DataAnnotations;

namespace Registro_Estudiantes.Server.Model.dto
{
    public class ContactsDto
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string LastMessage { get; set; }
        public bool Activo {  get; set; }
    }
}
