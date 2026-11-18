import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'practice',
    loadComponent: () => import('./pages/practice/practice.component').then((m) => m.PracticeComponent),
  },
  {
    path: 'theory',
    loadComponent: () => import('./pages/theory/theory.component').then((m) => m.TheoryComponent),
  },
  {
    path: 'glossary',
    loadComponent: () => import('./pages/glossary/glossary.component').then((m) => m.GlossaryComponent),
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () => import('./pages/admin/admin.component').then((m) => m.AdminComponent),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
