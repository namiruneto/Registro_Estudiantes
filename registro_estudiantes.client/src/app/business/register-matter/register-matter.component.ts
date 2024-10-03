import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment.prod';
import { AuthService } from '../../services/auth.service';


export interface Materia {    
  matternId: number;
  name: string;
  credit: number;
  nameTeacher: string;
}

export interface MateriasResponse {
  materias: Materia[];
  studentMatternDtos: Materia[];
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
  studentMatternDtos: Materia[] = [];

  private API_URL = `${environment.apiUrl}/api/Student/AvailableMaterial`;

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    this.cargarMaterias();
  }

  cargarMaterias(): void { 
   
    const requestBody = { username: Number(this.authService.getUser()) };   
    this.httpClient.post<MateriasResponse>(this.API_URL, requestBody).subscribe(
      (data) => {
        this.materias = data.materias;
        this.studentMatternDtos = data.studentMatternDtos;
      },
      (error) => {
        console.error('Error al cargar materias', error);
      }
    );
  }
  
  insertMatter(matternId: number): void {
    const url = `${environment.apiUrl}/api/Student/RegisterMattern`;
    const requestBody = { UserId: Number(this.authService.getUser()), MatternId: Number(matternId) };   
    console.log(requestBody);
    this.httpClient.post<any>(url, requestBody).subscribe(
      (response) => {
       alert('Materia registrada exitosamente');
        window.location.reload();        
      },
      (error) => {
        alert(error.error.message);       
      }
    );
  }

  deleterMatter(matternId: number): void {
    const url = `${environment.apiUrl}/api/Student/RemoveMattern`;
    const requestBody = { UserId: Number(this.authService.getUser()), MatternId: Number(matternId) };
    console.log(requestBody);
    this.httpClient.delete<any>(url, { body: requestBody }).subscribe(
      (response) => {
        alert('Materia Cancelada');
        window.location.reload();
      },
      (error) => {
        alert(error.error.message);
      }
    );
  }

}
