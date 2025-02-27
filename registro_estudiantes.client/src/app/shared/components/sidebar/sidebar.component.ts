import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isOpen: string | null = null;
  selectedMenu: string | null = null;

  toggleMenu(menu: string) {
    this.isOpen = this.isOpen === menu ? null : menu;
  }

  selectMenu(option: string) {
    this.selectedMenu = option;
  }
  constructor(private authService: AuthService) { }
  isSubmenuOpen = false; // Estado del submenú

  toggleSubmenu() {
    this.isSubmenuOpen = !this.isSubmenuOpen;
  }
  onLogout(): void {
    console.log('Token eliminado correctamente');
    this.authService.logout();     
  }
}
