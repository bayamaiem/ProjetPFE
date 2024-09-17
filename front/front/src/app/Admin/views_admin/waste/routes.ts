import { Routes } from '@angular/router';
import { DemandeComponent } from '../../../Usine/views_usine/demande/demande.component';

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
          title: 'All Usines Users',
        },
      },
      {
        path: 'users_collectors',
        loadComponent: () =>
          import('./users_collectors/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        data: {
          title: 'All Collectors Users',
        },
      },
      {
        path: 'users_recyclers',
        loadComponent: () =>
          import('./users_recyclers/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        data: {
          title: 'All Recyclers Users',
        },
      },
      {
        path: 'cardboard_waste',
        loadComponent: () =>
          import('./cardboard_waste/charts.component').then(
            (m) => m.ChartsComponent
          ),
        data: {
          title: 'waste',
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
        path: 'wastes',
        loadComponent: () =>
          import('../wastes/waste.component').then((m) => m.WasteComponent),
        data: {
          title: 'Dechets',
        },
      },
    ],
  },
];
