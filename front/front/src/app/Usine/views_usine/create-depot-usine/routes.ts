import { Routes } from '@angular/router';
import { CreateDepotUsineComponent } from './create-depot-usine.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./create-depot-usine.component').then(m=>CreateDepotUsineComponent)
    
  }
];

