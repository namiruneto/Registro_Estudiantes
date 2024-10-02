import { Routes } from '@angular/router';
import { AuthGuard } from './services/guards/auth.guard';
import { AuthenticatedGuard } from './services/guards/authenticated.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shared/components/layout/layout.component').then(m => m.LayoutComponent), // Asegúrate de que m.LayoutComponent sea correcto
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./business/dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        loadComponent: () => import('./business/profile/profile.component'),
        canActivate: [AuthGuard]
      },
      {
        path: 'tables',
        loadComponent: () => import('./business/tables/tables.component'),
        canActivate: [AuthGuard]

      },
      {
        path: 'RegistrarMateria',
        loadComponent: () => import('./business/register-matter/register-matter.component').then(m => m.RegisterMatterComponent),
        canActivate: [AuthGuard]

      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'

      }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./business/authentication/login/login.component').then(m => m.LoginComponent),
    canActivate: [AuthenticatedGuard]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
