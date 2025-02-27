import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SubjectDetailsComponent } from '../subject-details/subject-details.component';
import { Router } from '@angular/router';
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
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  campaigns = [
    { name: 'Campaña 1', status: 'Activa', startDate: new Date(), calls: 50 },
    { name: 'Campaña 2', status: 'Pausada', startDate: new Date(), calls: 30 },
    { name: 'Campaña 3', status: 'Detenida', startDate: new Date(), calls: 20 },
  ];

  activeCampaigns = 0;
  pausedCampaigns = 0;
  stoppedCampaigns = 0;
  totalCalls = 0;
  recentCampaigns: any[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.updateStats();
    this.recentCampaigns = this.campaigns.slice(0, 3); // Últimas 3 campañas
  }

  updateStats() {
    this.activeCampaigns = this.campaigns.filter(c => c.status === 'Activa').length;
    this.pausedCampaigns = this.campaigns.filter(c => c.status === 'Pausada').length;
    this.stoppedCampaigns = this.campaigns.filter(c => c.status === 'Detenida').length;
    this.totalCalls = this.campaigns.reduce((sum, c) => sum + c.calls, 0);
  }

  goToCampaign(campaign: any) {
    console.log("Ir a detalles de la campaña:", campaign);
    // Redirigir a la vista de detalles (según cómo manejes las rutas)
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
