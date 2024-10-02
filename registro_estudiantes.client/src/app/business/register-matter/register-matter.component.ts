import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment.prod';
import { AuthService } from '../../services/auth.service';


export interface Materia {
  materiaId: number;
  nombre: string;
  creditos: number;
}

@Component({
  selector: 'app-register-matter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register-matter.component.html',
  styleUrl: './register-matter.component.css'
})

export class RegisterMatterComponent implements OnInit {
  materias: Materia[] = [];

  private API_URL = `${environment.apiUrl}/api/Student/AvailableMaterial`;

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    this.cargarMaterias();
  }

  cargarMaterias(): void { 
   
    const requestBody = { username: this.authService.getUser() };
    console.log(requestBody);
    this.httpClient.post<Materia[]>(this.API_URL, requestBody).subscribe(
      (data) => {
        this.materias = data;
      },
      (error) => {
        console.error('Error al cargar materias', error);
      }
    );
  }

  seleccionarMateria(materia: Materia): void {
    console.log('Materia seleccionada:', materia);
    // Aquí puedes agregar la lógica para manejar la selección de la materia
  }
}
