import { Routes } from '@angular/router';
import { ListGroupsComponent } from './list-groups.component';
export const routes: Routes = [
  {
    path: '',
    component: ListGroupsComponent,

    data: {
      title: `updates`
    }
  }
];

