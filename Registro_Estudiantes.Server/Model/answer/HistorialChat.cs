using Registro_Estudiantes.Server.Model.dto;

namespace Registro_Estudiantes.Server.Model.answer
{
    public class HistorialChat
    {
        public List<ContactsDto> Contacts { get; set; }
        public List<MessagesDto> Messages { get; set; }
    }
}
