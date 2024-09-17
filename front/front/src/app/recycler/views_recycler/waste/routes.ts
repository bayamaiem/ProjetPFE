import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
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
    ],
  },
  {
    path: 'wastes',
    loadComponent: () =>
      import('../waste/wastes/waste.component').then((m) => m.WasteComponent),
    data: {
      title: 'dechets',
    },
  },

  {
    path: 'waste_movement',
    loadComponent: () =>
      import('../waste/waste_movement/waste.component').then(
        (m) => m.WasteComponent
      ),
    data: {
      title: 'dechets',
    },
  },

  {
    path: 'waste_ processing_movement',
    loadComponent: () =>
      import('../waste/waste_ processing_movement/waste.component').then(
        (m) => m.WasteComponent
      ),
  },

  {
    path: 'waste_processing',
    loadComponent: () =>
      import('../waste/waste_processing/waste.component').then(
        (m) => m.WasteComponent
      ),
    data: {
      title: 'dechets',
    },
  },
  {
    path: 'details_dangaural_waste',
    loadComponent: () =>
      import('../waste/details_dangaural_waste/waste.component').then(
        (m) => m.WasteComponent2
      ),
    data: {
      title: 'details_dangaural_waste',
    },
  },
  {
    path: 'waste_mouvement_exception',
    loadComponent: () =>
      import('../waste/waste_mouvement_exception/waste.component').then(
        (m) => m.WasteComponent
      ),
    data: {
      title: 'waste_mouvement_exception',
    },
  },
  /*
  {
    path: 'customers',
    loadComponent: () =>
      import('../customers').then(
        (m) => m.DashboardComponent
      ),
    data: {
      title: 'customers',
    },
  }, */
  {
    path: 'notifications2',
    loadComponent: () =>
      import('../notifications2/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    data: {
      title: 'customers',
    },
  },

  {
    path: 'updates',
    loadComponent: () =>
      import('../updates/list-groups.component').then(
        (m) => m.ListGroupsComponent
      ),
    data: {
      title: 'Updates',
    },
  },

  {
    path: 'customer_list_contact',
    loadComponent: () =>
      import('../customer_list_contact/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
];
