import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
  
interface Contact {
  id: number;
  name: string;
  lastMessage: string;
}

interface Message {
  sender: string;
  text: string;
  timestamp: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  contacts: Contact[] = [
    { id: 1, name: 'Juan Pérez', lastMessage: 'Nos vemos mañana' },
    { id: 2, name: 'Ana Gómez', lastMessage: 'Gracias por tu ayuda!' },
    { id: 3, name: 'Carlos Ramírez', lastMessage: '¿Qué tal todo?' }
  ]; selectedContact: Contact | null = null;
  messages: Message[] = [];

  dummyMessages: { [key: number]: Message[] } = {
    1: [
      { sender: 'Juan Pérez', text: 'Hola, ¿cómo estás?', timestamp: '10:00 AM' },
      { sender: 'Tú', text: '¡Bien! ¿Y tú?', timestamp: '10:02 AM' }
    ],
    2: [
      { sender: 'Ana Gómez', text: '¿Me puedes ayudar con esto?', timestamp: '11:00 AM' },
      { sender: 'Tú', text: 'Claro, dime.', timestamp: '11:05 AM' }
    ],
    3: [
      { sender: 'Carlos Ramírez', text: 'Oye, ¿vas a la reunión?', timestamp: '12:00 PM' },
      { sender: 'Tú', text: 'Sí, a las 3 PM.', timestamp: '12:10 PM' }
    ]
  };

  selectContact(contact: Contact) {
    this.selectedContact = contact;
    this.messages = this.dummyMessages[contact.id] || [];
  }

  sendMessage(text: string) {
    if (!text.trim() || !this.selectedContact) return;

    this.messages.push({ sender: 'Tú', text, timestamp: new Date().toLocaleTimeString() });
  }
}
