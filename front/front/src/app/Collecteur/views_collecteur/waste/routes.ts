import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Waste'
    },
    children: [
      {
        path: '',
        redirectTo: 'cards',
        pathMatch: 'full'
      },
      {
        path: 'users_factories',
        loadComponent: () => import('./users_factories/dashboard.component').then(m => m.DashboardComponent),
        data: {
          title: 'users_factories'
        }
      },
      {
        path: 'users_collectors',
        loadComponent: () => import('./users_collectors/dashboard.component').then(m => m.DashboardComponent),
        data: {
          title: 'users_collectors'
        }
      }, {
        path: 'users_recyclers',
        loadComponent: () => import('./users_recyclers/dashboard.component').then(m => m.DashboardComponent),
        data: {
          title: 'users_recyclers'
        }
      },
      {
        path: 'Liste_Demande',
        loadComponent: () => import('../../demande/demande.component').then(m => m.DemandeComponent),
        data: {
          title: 'users_recyclers'
        }
      },

      
     

      
     

      
    
      
     
    
     
      
    
]
}];
    
    
    