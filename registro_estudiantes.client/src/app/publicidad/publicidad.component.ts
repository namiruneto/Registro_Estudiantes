import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-publicidad',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './publicidad.component.html',
  styleUrl: './publicidad.component.css'
})
export class PublicidadComponent {
  phoneNumbers: string[] = [];
  newPhoneNumber: string = '';

  title: string = '';
  script: string = '';

  products: string[] = [];
  newProduct: string = '';

  callStartDate: string = '';
  callEndDate: string = '';
  callStartTime: string = '';
  callEndTime: string = '';

  addPhoneNumber() {
    if (this.newPhoneNumber.trim()) {
      this.phoneNumbers.push(this.newPhoneNumber.trim());
      this.newPhoneNumber = ''; // Limpiar input después de agregar
    }
  }

  addProduct() {
    if (this.newProduct.trim()) {
      this.products.push(this.newProduct.trim());
      this.newProduct = ''; // Limpiar input después de agregar
    }
  }

  generateCall() {
    if (!this.title || !this.script) {
      alert('Por favor, completa el título y el guion antes de generar la llamada.');
      return;
    }
    if (!this.callStartDate || !this.callEndDate || !this.callStartTime || !this.callEndTime) {
      alert('Por favor, selecciona la fecha y hora de inicio y fin.');
      return;
    }
    if (new Date(this.callStartDate) > new Date(this.callEndDate)) {
      alert('La fecha de inicio no puede ser posterior a la fecha de fin.');
      return;
    }
    if (this.callStartDate === this.callEndDate && this.callStartTime > this.callEndTime) {
      alert('La hora de inicio no puede ser mayor que la hora de fin en el mismo día.');
      return;
    }

    alert(`📞 Iniciando llamadas...\nTítulo: ${this.title}\nGuion: ${this.script}\nProductos: ${this.products.join(', ')}\nFecha: ${this.callStartDate} - ${this.callEndDate}\nHora: ${this.callStartTime} - ${this.callEndTime}`);
  }
}
