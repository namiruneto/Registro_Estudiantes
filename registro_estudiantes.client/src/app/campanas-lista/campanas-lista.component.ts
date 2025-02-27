import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Campaign {
  id: number;
  name: string;
  status: string;
  startDate: Date;
  endDate: Date;
  phoneNumbers: { number: string; called: boolean; note: string }[];
}


@Component({
  selector: 'app-campanas-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './campanas-lista.component.html',
  styleUrl: './campanas-lista.component.css'
})
export class CampanasListaComponent {
  campaigns: Campaign[] = [
    {
      id: 1,
      name: "Campaña de Ventas",
      status: "Activa",
      startDate: new Date("2024-02-01"),
      endDate: new Date("2024-03-01"),
      phoneNumbers: [
        { number: "123456789", called: true, note: "Primer intento" },
        { number: "987654321", called: false, note: "No respondió" },
        { number: "111222333", called: true, note: "Confirmado" },
      ],
    },
    {
      id: 2,
      name: "Campaña de Encuestas",
      status: "Pausada",
      startDate: new Date("2024-01-15"),
      endDate: new Date("2024-02-15"),
      phoneNumbers: [
        { number: "444555666", called: false, note: "No contestó" },
        { number: "777888999", called: true, note: "Encuesta completa" },
      ],
    }
  ];
  selectedCampaign: any = null;

  verDetalles(campaign: any) {
    this.selectedCampaign = campaign;
  }

  changeStatus(campaign: any, newStatus: string) {
    campaign.status = newStatus;
  }
  
  getCalledCount(campaign: Campaign): number {
    return campaign.phoneNumbers.filter(phone => phone.called).length;
  }

  getEstimatedCalls(campaign: Campaign): number {
    return campaign.phoneNumbers.length;
  }

}
