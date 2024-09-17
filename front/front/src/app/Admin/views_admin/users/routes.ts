import { Routes } from '@angular/router';
import { RoleGuard } from '../../../role-guard.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard.component').then((m) => m.DashboardComponent),
    data: {
      title: $localize`Dashboard`,
    },
  },
];
