import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./Modals.component').then(m => m.ModalsComponent),
   
  }
];

