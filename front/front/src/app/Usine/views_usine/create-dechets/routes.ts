import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./Create-dechets.component').then(m => m.CreateDechetsComponent),
    
  }
];

