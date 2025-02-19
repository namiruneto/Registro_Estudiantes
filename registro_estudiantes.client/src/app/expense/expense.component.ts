import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';

interface Expense {
  category: string;
  basicLimit: number;
  used: number;
  additionalCostPerUnit: number;
}


@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css'
})
export class ExpenseComponent {
  expenses: Expense[] = [
    { category: 'Mensajes API', basicLimit: 1000, used: 1200, additionalCostPerUnit: 0.05 },
    { category: 'Minutos Llamada', basicLimit: 500, used: 450, additionalCostPerUnit: 0.10 },
    { category: 'Mensajes WhatsApp', basicLimit: 800, used: 950, additionalCostPerUnit: 0.08 }
  ];

  chart: any;

  getMin(a: number, b: number): number {
    return Math.min(a, b);
  }

  get totalBasicUsed() {
    return this.expenses.reduce((sum, e) => sum + this.getMin(e.used, e.basicLimit), 0);
  }

  get totalAdditionalCost() {
    return this.expenses.reduce((sum, e) => sum + (e.used > e.basicLimit ? (e.used - e.basicLimit) * e.additionalCostPerUnit : 0), 0);
  }

  ngAfterViewInit() {
    this.renderChart();
  }

  renderChart() {
    const ctx = document.getElementById('expenseChart') as HTMLCanvasElement;
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.expenses.map(e => e.category),
        datasets: [
          {
            label: 'Usado del Plan Básico',
            data: this.expenses.map(e => this.getMin(e.used, e.basicLimit)),
            backgroundColor: 'rgba(54, 162, 235, 0.6)'
          },
          {
            label: 'Consumo Adicional',
            data: this.expenses.map(e => e.used > e.basicLimit ? e.used - e.basicLimit : 0),
            backgroundColor: 'rgba(255, 99, 132, 0.6)'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' }
        }
      }
    });
  }
}
