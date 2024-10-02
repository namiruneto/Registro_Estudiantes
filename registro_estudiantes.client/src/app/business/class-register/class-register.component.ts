import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

export interface Materia {
  matternId: number;
  name: string;
  credit: number;
  nameTeacher: string;
}

@Component({
  selector: 'app-class-register',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './class-register.component.html',
  styleUrls: ['./class-register.component.css']
})
export class ClassRegisterComponent implements OnInit {
  mattern: Materia[] = [];

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadSubjects(); 
  }

  loadSubjects(): void {
    const url = `${environment.apiUrl}/api/Student/SignMattern`;
    const requestBody = { username: Number(this.authService.getUser()) };
    console.log(requestBody);
    this.httpClient.post<Materia[]>(url, requestBody).subscribe(
      (data) => {
        console.log(data);
        this.mattern = data;
      },
      (error) => {
        console.error('Error al cargar materias', error);
      }
    );
  }

  selectSubject(subject: any): void {
    //this.selectedSubject = subject; // Selecciona la materia para mostrar detalles
  }
}
