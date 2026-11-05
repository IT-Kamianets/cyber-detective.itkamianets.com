import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'practice',
    loadComponent: () => import('./pages/practice/practice.component').then((m) => m.PracticeComponent),
  },
  {
    path: 'progress',
    loadComponent: () => import('./pages/progress/progress.component').then((m) => m.ProgressComponent),
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin.component').then((m) => m.AdminComponent),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
