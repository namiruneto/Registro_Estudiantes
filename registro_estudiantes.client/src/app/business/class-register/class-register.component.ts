import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SubjectDetailsComponent } from '../subject-details/subject-details.component';
export interface Materia {
  matternId: number;
  name: string;
  credit: number;
  nameTeacher: string;
}

export interface MatterRegister {
  nameStudent: string;
 
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

  constructor(private httpClient: HttpClient, private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadSubjects(); 
  }

  loadSubjects(): void {
    const url = `${environment.apiUrl}/api/Student/SignMattern`;
    const requestBody = { username: Number(this.authService.getUser()) };    
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

  selectSubject(matterId: number): void {
    const selectedMatter = this.mattern.find(m => m.matternId === matterId);
    const url = `${environment.apiUrl}/api/Student/InfoRegisterClass`;
    const requestBody = { UserId: Number(this.authService.getUser()), MatternId: Number(matterId) }; 
    this.httpClient.post<MatterRegister[]>(url, requestBody).subscribe(
      (response) => {
        console.log(response);
        const dataToSend = {
          matter: selectedMatter,
          additionalData: response 
        };
        this.dialog.open(SubjectDetailsComponent, {
          width: '600px',
          height: 'auto',
          maxHeight: '80vh',
          data: dataToSend
        });
      },
      (error) => {
        alert(error.error.message);
      }
    );     

    
  }
}
