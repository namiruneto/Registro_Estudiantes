import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment.prod';


interface Case {
  id: number;
  title: string;
  problem: string;
  suggestedSolutions: string[];
  solutionsStatus: { [key: string]: string }; // Estado de cada solución
  appliedSolution?: string;
  additionalSolutions: string[];
}

interface ApiResponse {
  cases: {
    id: number;
    title: string;
    problem: string;
    appliedSolution: string;
    activo: boolean;
  }[];
  solutions: {
    id: number;
    caseId: number;
    solution: string;
    status: string;
  }[];
}

@Component({
  selector: 'app-soport',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './soport.component.html',
  styleUrl: './soport.component.css'
})


export class SoportComponent {
  private API_URL = `${environment.apiUrl}/api/Student/Casos`;  
  cases: Case[] = [];
  selectedCase: Case | null = null;
  solutionStatuses = ['Efectiva', 'No Aplicable', 'Ineficaz'];

  constructor(private httpClient: HttpClient, private authService: AuthService) { }


  ngOnInit() {
    this.fetchCases();
  }

  fetchCases() {
    const requestBody = { username: Number(this.authService.getUser()) };
    this.httpClient.post<ApiResponse>(this.API_URL, requestBody).subscribe(
      (response) => {
        this.cases = response.cases.map((caseItem) => ({
          id: caseItem.id,
          title: caseItem.title,
          problem: caseItem.problem,
          suggestedSolutions: response.solutions
            .filter((sol) => sol.caseId === caseItem.id)
            .map((sol) => sol.solution),
          solutionsStatus: {},
          appliedSolution: caseItem.appliedSolution.trim() || '',
          additionalSolutions: []
        }));
      },
      (error) => {
        console.error('Error al obtener los casos:', error);
      }
    );
  }

  selectCase(caseItem: Case) {
    this.selectedCase = caseItem;

    // Inicializar estados si no existen
    if (!this.selectedCase.solutionsStatus) {
      this.selectedCase.solutionsStatus = {};
    }
  }

  saveSolution() {
    if (!this.selectedCase) return;

    this.cases = this.cases.filter((c) => c.id !== this.selectedCase?.id);

    const requestBody = { username: Number(this.selectedCase?.id) };
    console.log('Enviando solución:', requestBody);
    this.httpClient.post(`${environment.apiUrl}/api/Student/CasosFinalizar`, requestBody).subscribe(
      () => {
        console.log('Mensaje de finalización enviado con éxito');
      },
      (error) => {
        console.error('Error al enviar mensaje de finalización:', error);
      }
    );

    this.selectedCase = null;
  }
}
