import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


interface Case {
  id: number;
  title: string;
  problem: string;
  suggestedSolutions: string[];
  solutionsStatus: { [key: string]: string }; // Estado de cada solución
  appliedSolution?: string;
  additionalSolutions: string[];
}

@Component({
  selector: 'app-soport',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './soport.component.html',
  styleUrl: './soport.component.css'
})


export class SoportComponent {
  cases: Case[] = [
    {
      id: 1,
      title: 'Error en la facturación',
      problem: 'El cliente no puede generar una factura desde el sistema.',
      suggestedSolutions: [
        'Revisar conexión a la base de datos.',
        'Verificar permisos del usuario.',
        'Actualizar la versión del sistema.'
      ],
      solutionsStatus: {},
      appliedSolution: '',
      additionalSolutions: []
    },
    {
      id: 2,
      title: 'Problema con la impresión',
      problem: 'La impresora no responde al enviar un documento.',
      suggestedSolutions: [
        'Verificar conexión USB o WiFi.',
        'Reinstalar los drivers de la impresora.',
        'Cambiar la configuración de impresión.'
      ],
      solutionsStatus: {},
      appliedSolution: '',
      additionalSolutions: []
    }
  ];

  selectedCase: Case | null = null;
  solutionStatuses = ['Efectiva', 'No Aplicable', 'Ineficaz'];

  selectCase(caseItem: Case) {
    this.selectedCase = caseItem;

    // Inicializar estados si no existen
    if (!this.selectedCase.solutionsStatus) {
      this.selectedCase.solutionsStatus = {};
    }
  }

  saveSolution() {
    console.log('Solución guardada:', this.selectedCase);
  }
}
