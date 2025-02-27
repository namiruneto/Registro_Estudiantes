import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-administrativo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './administrativo.component.html',
  styleUrl: './administrativo.component.css'
})
export class AdministrativoComponent {
  user = {
    name: '',
    email: '',
    password: '',
    permissions: {
      conversaciones: false,
      campañas: false,
      gastos: false,
      administrativo: false
    }
  };

  permissions = [
    { key: 'conversaciones', label: 'Conversaciones' },
    { key: 'campañas', label: 'Campañas' },
    { key: 'gastos', label: 'Gastos' },
    { key: 'administrativo', label: 'Administrativo' }
  ];

  onSubmit() {
    console.log('Usuario registrado:', this.user);
    // Aquí se enviaría la data al backend
  }
}
