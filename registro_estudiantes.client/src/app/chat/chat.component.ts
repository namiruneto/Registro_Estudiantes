import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

interface Contact {
  id: number;
  name: string;
  lastMessage: string;
  activo: boolean;
}

interface Message {
  id: number;
  contactId: number;
  sender: string;
  text: string;
  timestamp: string;
  activo: boolean;
}

interface ChatResponse {
  contacts: Contact[];
  messages: Message[];
}


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  contacts: Contact[] = [];
  selectedContact: Contact | null = null;
  messages: Message[] = [];
  private API_URL = `${environment.apiUrl}/api/Student/Chat`;
  private intervalId: any;

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    this.cargarChat();
    this.intervalId = setInterval(() => {
      this.cargarChat(); // Actualiza contactos
      if (this.selectedContact) {
        this.actualizarMensajes(); // Si hay chat abierto, actualiza mensajes
      }
    }, 5000);
  }
  ngOnDestroy(): void {
    // 🛑 Limpia el intervalo cuando el componente se destruye
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  cargarChat(): void {
    const requestBody = { username: Number(this.authService.getUser()) };

    this.httpClient.post<ChatResponse>(this.API_URL, requestBody).subscribe(
      (data) => {
        this.contacts = data.contacts.filter(contact => contact.activo);
      },
      (error) => {
        console.error('Error al cargar el chat:', error);
      }
    );
  }
  selectContact(contact: Contact) {
    this.selectedContact = contact;
    this.actualizarMensajes(); // Carga inicial de mensajes del contacto seleccionado
  }

  actualizarMensajes() {
    if (!this.selectedContact) return;

    const requestBody = { username: Number(this.authService.getUser()) };

    this.httpClient.post<ChatResponse>(this.API_URL, requestBody).subscribe(
      (data) => {
        this.messages = data.messages
          .filter(msg => msg.contactId === this.selectedContact!.id && msg.activo)
          .map(msg => ({
            ...msg,
            timestamp: new Date(msg.timestamp).toLocaleString()
          }));
      },
      (error) => {
        console.error('Error al actualizar mensajes:', error);
      }
    );
  }
  
  sendMessage(text: string) {
    if (!text.trim() || !this.selectedContact) return;

    const requestBody = {
      username: Number(this.authService.getUser()), // Usuario autenticado
      idContacto: this.selectedContact.id, // ID del contacto
      sender: 'Tú', // Remitente del mensaje
      mensaje: text // Contenido del mensaje
    };

    // Agregar mensaje localmente para mostrarlo en el chat antes de enviarlo
    const newMessage: Message = {
      id: Math.random(), // ID temporal
      contactId: this.selectedContact.id,
      sender: 'Tú',
      text,
      timestamp: new Date().toISOString(),
      activo: true
    };

    this.messages.push({
      ...newMessage,
      timestamp: new Date(newMessage.timestamp).toLocaleString()
    });
    console.log(requestBody);
    // Enviar la petición con el formato correcto
    this.httpClient.post(`${environment.apiUrl}/api/Student/EnviarMensaje`, requestBody).subscribe(
      () => console.log('Mensaje enviado con éxito'),
      (error) => console.error('Error al enviar mensaje:', error)
    );
  }



  generateCase() {
    if (!this.selectedContact) return;

    if (confirm(`Generando caso para ${this.selectedContact?.name}`)) {
      const requestBody = {
        username: Number(this.authService.getUser()), // Usuario autenticado
        idContacto: this.selectedContact.id, // ID del contacto
        sender: 'Tú', // Remitente del mensaje
        mensaje: "" // Contenido del mensaje
      };

      this.httpClient.post(`${environment.apiUrl}/api/Student/FinalizarConversacion`, requestBody).subscribe(
        () => {
          console.log('Mensaje de finalización enviado con éxito');
          this.messages = [];
          this.selectedContact = null;
        },
        (error) => {
          console.error('Error al enviar mensaje de finalización:', error);
        }
      );
    }
  }

  endConversation() {
    if (!this.selectedContact) return;

    if (confirm("¿Seguro que quieres finalizar la conversación?")) {    
      const requestBody = {
        username: Number(this.authService.getUser()), // Usuario autenticado
        idContacto: this.selectedContact.id, // ID del contacto
        sender: 'Tú', // Remitente del mensaje
        mensaje: "" // Contenido del mensaje
      };

      this.httpClient.post(`${environment.apiUrl}/api/Student/FinalizarConversacion`, requestBody).subscribe(
        () => {
          console.log('Mensaje de finalización enviado con éxito');
          this.messages = [];
          this.selectedContact = null;
        },
        (error) => {
          console.error('Error al enviar mensaje de finalización:', error);
        }
      );
    }
  }
}
