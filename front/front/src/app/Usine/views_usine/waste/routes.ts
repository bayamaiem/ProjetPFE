import { Routes } from '@angular/router';
import { DemandeComponent } from '../demande/demande.component';

export const routes: Routes = [
  {
    path: '',

    children: [
      {
        path: '',
        redirectTo: 'cards',
        pathMatch: 'full',
      },
      {
        path: 'users_factories',
        loadComponent: () =>
          import('./users_factories/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        data: {
          title: 'users_factories',
        },
      },
      {
        path: 'users_collectors',
        loadComponent: () =>
          import('./users_collectors/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        data: {
          title: 'users_collectors',
        },
      },
      {
        path: 'users_recyclers',
        loadComponent: () =>
          import('./users_recyclers/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        data: {
          title: 'users_recyclers',
        },
      },
      {
        path: 'dechets_carton',
        loadComponent: () =>
          import('./dechets_carton/Cartondechets.component').then(
            (m) => m.CartondechetsComponent
          ),
        data: {
          title: 'dechets_carton',
        },
      },

      {
        path: 'plastic_waste',
        loadComponent: () =>
          import('./plastic_waste/charts.component').then(
            (m) => m.ChartsComponent
          ),
        data: {
          title: 'plastic_waste',
        },
      },

      {
        path: 'textile_waste',
        loadComponent: () =>
          import('./textile_waste/charts.component').then(
            (m) => m.ChartsComponent
          ),
        data: {
          title: 'textile_waste',
        },
      },

      {
        path: 'dangaural_wastes',
        loadComponent: () =>
          import('./dangaural_wastes/charts.component').then(
            (m) => m.ChartsComponent
          ),
        data: {
          title: 'dangaural_wastes',
        },
      },

      {
        path: 'Collecteur/demande',
        loadComponent: () =>
          import('../demande/demande.component').then(
            (m) => m.DemandeComponent
          ),
        data: {
          title: 'Demande',
        },
      },
    ],
  },
];
