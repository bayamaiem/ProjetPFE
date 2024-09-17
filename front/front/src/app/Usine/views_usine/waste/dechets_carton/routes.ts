import { Routes } from '@angular/router';

import {CartondechetsComponent} from './Cartondechets.component';

export const routes: Routes = [
  {
    path: '',
    component: CartondechetsComponent,
    data: {
      title: 'dechets_carton'
    }
  }
];
