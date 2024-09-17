import { Routes } from '@angular/router';
import { CreateDepotComponent } from './create-depot.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./create-depot.component').then(m=>CreateDepotComponent)
    
  }
];

