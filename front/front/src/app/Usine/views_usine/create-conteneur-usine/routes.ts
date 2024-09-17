import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./create-conteneur-usine.component').then(m => m.CreateConteneurComponent),
    
  }
];

