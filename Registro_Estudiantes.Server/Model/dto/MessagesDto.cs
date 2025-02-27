using System.ComponentModel.DataAnnotations;

namespace Registro_Estudiantes.Server.Model.dto
{
    public class MessagesDto
    {
        [Key]
        public int Id { get; set; }
        public int ContactId { get; set; }
        public string Sender { get; set; }
        public string Text { get; set; }
        public DateTime Timestamp { get; set; }
        public bool Activo { get; set; }
    }
}
