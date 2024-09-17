import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./modals.component').then(m => m.ModalsComponent),
   
  }
];

