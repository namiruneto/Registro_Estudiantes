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
        path: 'RegistrarMateria',
        loadComponent: () => import('./chat/chat.component').then(m => m.ChatComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'StudentClasses',
        loadComponent: () => import('./soport/soport.component').then(m => m.SoportComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'ClassRegister',
        loadComponent: () => import('./expense/expense.component').then(m => m.ExpenseComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'Publicidad',
        loadComponent: () => import('./publicidad/publicidad.component').then(m => m.PublicidadComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'ListadoPublicidad',
        loadComponent: () => import('./campanas-lista/campanas-lista.component').then(m => m.CampanasListaComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'Administrativo',
        loadComponent: () => import('./administrativo/administrativo.component').then(m => m.AdministrativoComponent),
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
