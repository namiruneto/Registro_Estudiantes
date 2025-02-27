using Microsoft.Win32;
using Registro_Estudiantes.Server.Data;
using Registro_Estudiantes.Server.Model.answer;
using Registro_Estudiantes.Server.Model.dto;
using Registro_Estudiantes.Server.Model.Request;
using System.Diagnostics.Contracts;
using System.Reflection;
using System.Reflection.Metadata;

namespace Registro_Estudiantes.Server.Services
{
    public class Conversaciones
    {
        private readonly ApplicationDbContext _context;

        public Conversaciones(ApplicationDbContext context)
        {
            _context = context;
        }

         public HistorialChat chat()
        {
            List<ContactsDto> contacts = _context.Contacts.Where(x => x.Activo == true).ToList();
            List<MessagesDto> messagesDtos = _context.Messages.Where(x => x.Activo == true).ToList();
            return new HistorialChat
            {
                Contacts = contacts,
                Messages = messagesDtos
            };
        }

        public void sendMessage(NuevoMensaje contacto)
        {
            MessagesDto messages = new MessagesDto
            {
                ContactId = contacto.IdContacto,
                Activo = true,
                Sender = contacto.Sender,
                Text = contacto.Mensaje,
                Timestamp = DateTime.Now,
            };
            _context.Messages.Add(messages);
            _context.SaveChanges();
            var contact = _context.Contacts.SingleOrDefault(x => x.Id == contacto.IdContacto);
            contact.LastMessage =  contacto.Mensaje;
            _context.Contacts.Update(contact);
            _context.SaveChanges();
            
        }

        public void FinalizarConversacion(NuevoMensaje idContacto)
        {
            var contact = _context.Contacts.SingleOrDefault(x => x.Id == idContacto.IdContacto);
            contact.Activo = false;
            _context.Contacts.Update(contact);
            _context.SaveChanges();
        }


        public HistorialCasos casos()
        {
            List<CasesDto>  cases = _context.Cases.Where(x => x.Activo == true).ToList();
            List<CaseSolutionsDto>  caseSolutions = _context.CaseSolutions.Select(x => x).ToList();
            return new HistorialCasos
            {
                Cases = cases,
                Solutions = caseSolutions
            };
        }


        public void CasosFinalizar(int numeroCaso)
        {
            var caso = _context.Cases.SingleOrDefault(x => x.id == numeroCaso);
            caso.Activo = false;
            _context.Cases.Update(caso);
            _context.SaveChanges();
        }

    }
}
