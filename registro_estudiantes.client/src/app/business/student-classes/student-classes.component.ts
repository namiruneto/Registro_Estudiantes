import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { request } from 'https';

export interface StudentClass {
  matternId: number;
  name: string;
  nameTeacher: string;
}

@Component({
  selector: 'app-student-classes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-classes.component.html',
  styleUrls: ['./student-classes.component.css']
})
export class StudentClassesComponent implements OnInit {
  studentId: number = 0; 
  classes: StudentClass[] = []; 
  errorMessage: string = ''; 
  studentName: string = ''; 

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    
  }
  loadStudentName(): void {
    const url = `${environment.apiUrl}/api/Student/InfoNameStuden`; 
    const requestBody = { IdStudent: Number(this.studentId), UserId: Number(this.authService.getUser()) };
    console.log(requestBody);
    this.httpClient.post<{ name: string }>(url, requestBody).subscribe(
      (response) => {
        this.studentName = response.name; 
      },
      (error) => {
        this.errorMessage = 'Error al cargar el nombre del estudiante';
        console.error('Error al cargar nombre', error);
      }
    );
  }

  loadStudentClasses(): void {
    const url = `${environment.apiUrl}/api/Student/SignMattern`;
    const requestBody = { username: Number(this.studentId) };
    console.log(requestBody);
    this.httpClient.post<StudentClass[]>(url, requestBody).subscribe(
      (data) => {
        this.classes = data;
        this.errorMessage = '';
        this.loadStudentName();
      },
      (error) => {
        this.classes = []; 
        this.errorMessage = 'Error al cargar las clases';
        console.error('Error al cargar las clases', error);
      }
    );
  }
}
