import { UpdateDechetComponent } from './Usine/views_usine/update-dechet/update-dechet.component';
import { DefaultLayoutComponent } from './Collecteur/layout/default-layout/default-layout.component';
import { DefaultLayoutComponent2 } from './Admin/layout/default-layout/default-layout.component';
import { DefaultLayoutComponent4 } from './Usine/layout/default-layout/default-layout.component';
import { DefaultLayoutComponent3 } from './recycler/layout/default-layout/default-layout.component';
import{ResetPasswordComponent }from './reset-password/reset-password.component';
import { Routes } from '@angular/router';
import { CreateDechetsComponent } from './Usine/views_usine/create-dechets/create-dechets.component';
import { CreateDepotUsineComponent } from './Usine/views_usine/create-depot-usine/create-depot-usine.component';
import { AffichelisteDechetsComponent } from './Usine/views_usine/afficheliste-dechets/afficheliste-dechets.component';
import { AffichelisteDepotUsineComponent } from './Usine/views_usine/afficheliste-depot-usine/afficheliste-depot-usine.component';
import { UpdateDepotUsineComponent } from './Usine/views_usine/update-depot/update-depot.component';
import { RegisterComponent } from '../app/components/register/register.component';
import { LoginComponent } from '../app/components/login/login.component';
import { AuthGuard } from '../../src/app/auth.guard';
import { ForgetPasswordComponent } from '../app/components/forget-password/forget-password.component';
import { UpdateConteneurUsineComponent } from './Usine/views_usine/update-conteneur-usine/update-conteneur-usine.component';
import { CreateDepotCollecteurComponent } from './Collecteur/views_collecteur/create-depot-collecteur/create-depot-collecteur.component';
import { AffichelisteDepotCollecteurComponent } from './Collecteur/views_collecteur/afficheliste-depot-collecteur/afficheliste-depot-collecteur.component';
import { UpdateDepotCollecteurComponent } from './Collecteur/views_collecteur/update-depot-collecteur/update-depot-collecteur.component';
import { UpdateConteneurCollecteurComponent } from './Collecteur/views_collecteur/update-conteneur-collecteur/update-conteneur-collecteur.component';
import { AffichelisteDepotRecycleurComponent } from './recycler/views_recycler/afficheliste-depot-recycleur/afficheliste-depot-recycleur.component';
import { CreateDepotRecycleurComponent } from './recycler/views_recycler/create-depot-recycleur/create-depot-recycleur.component';
import { DemandeComponent } from './Usine/views_usine/demande/demande.component';
import { UpdateDepotRecycleurComponent } from './recycler/views_recycler/update-depot-recycleur/update-depot-recycleur.component';
import { StockerConteneurComponent } from './recycler/views_recycler/stocker-conteneur/stocker-conteneur.component';
import { AffichelisteConteneurCollecteurPublierTextilleComponent } from './Collecteur/views_collecteur/afficheliste-conteneur-publier-textille-collecteur/afficheliste-conteneur-collecteur-publier-textille.component';
import { AffichelistecodesusineComponent } from './Usine/views_usine/affichelistecodes-usine/affichelistecodesusine/affichelistecodesusine.component';
import { CreatecodesusineComponent } from './Usine/views_usine/createcodes-usine/createcodesusine/createcodesusine.component';
import { UpdateCodeUsineComponentComponent } from './Usine/views_usine/update-code-usine-component/update-code-usine-component.component';
import { AffichelisteConteneurCollecteurPublierCartonComponent } from './Collecteur/views_collecteur/afficheliste-conteneur-publier-carton-collecteur/afficheliste-conteneur-collecteur-publier-carton.component';
import { AffichelistecodesrecycleurComponent } from './recycler/views_recycler/affichelistecodes-recycleur/affichelistecodesusine/affichelistecodesrecycleur.component';
import { UpdateCodeRecycleurComponent } from './recycler/views_recycler/update-code-recycleur/update-code-recycleur.component';
import { CreateCodesRecycleurComponent } from './recycler/views_recycler/create-codes-recycleur/create-codes-recycleur.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent2,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'Admin/views_admin/users',
        loadChildren: () =>
          import('./Admin/views_admin/users/routes').then((m) => m.routes),
      },
      {
        path: 'Admin/views_admin/waste',
        loadChildren: () =>
          import('./Admin/views_admin/waste/routes').then((m) => m.routes),
      },

      {
        path: 'Admin/views_admin/settings',
        loadChildren: () =>
          import('./Admin/views_admin/settings/routes').then((m) => m.routes),
      },

      {
        path: 'Admin/views_admin/notifications',
        loadChildren: () =>
          import('./Admin/views_admin/notifications/routes').then(
            (m) => m.routes
          ),
      },

      {
        path: 'Admin/views_admin/users_details',
        loadChildren: () =>
          import('./Admin/views_admin/users_details/routes').then(
            (m) => m.routes
          ),
      },
      {
        path: 'Admin/views_admin/wastes',
        data: {
          title: 'dechets',
        },
        loadComponent: () =>
          import('./Admin/views_admin/wastes/waste.component').then(
            (m) => m.WasteComponent
          ),
      },

      {
        path: 'Admin/views_admin/notifications/Admin/views_admin/users',
        loadChildren: () =>
          import('./Admin/views_admin/users/routes').then((m) => m.routes),
      },

      {
        path: 'Admin/views_admin/notifications/Admin/views_admin/users/Admin/views_admin/users_details',
        loadChildren: () =>
          import('./Admin/views_admin/users_details/routes').then(
            (m) => m.routes
          ),
      },
    ],
  },

  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'Collecteur/views_collecteur/usersUsine',
        loadChildren: () =>
          import('./Collecteur/views_collecteur/usersUsine/routes').then(
            (m) => m.routes
          ),
      },

      {
        path: 'Collecteur/views_collecteur/users',
        loadChildren: () =>
          import('./Collecteur/views_collecteur/users/routes').then(
            (m) => m.routes
          ),
      },
      /*{
        path: 'Collecteur/views_collecteur/waste/demande',
        loadChildren: () =>
          import('./Collecteur/demande/routes').then(
            (m) => m.routes
          ),
      },*/

      {
        path: 'Collecteur/views_collecteur/list-demande',

        data: {
          title: 'Liste Des Demande',
        },
        loadComponent: () =>
          import('./Collecteur/demande/demande.component').then(
            (m) => m.DemandeComponent
          ),
      },
      {
        path: 'Collecteur/views_collecteur/collecteur/liste-container/type/carton',
        data: {
          title: 'Conteneur de type Carton',
        },
        loadComponent: () =>
          import('./Collecteur/views_collecteur/afficheliste-conteneur-publier-carton-collecteur/afficheliste-conteneur-collecteur-publier-carton.component').then(
            (m) => m.AffichelisteConteneurCollecteurPublierCartonComponent
          ),
      },

      {
        path: 'Collecteur/views_collecteur/collecteur/liste-container/type/plastique',
        data: {
          title: 'Conteneur de type Plastique',
        },
        loadComponent: () =>
          import('./Collecteur/views_collecteur/afficheliste-conteneur-publier-plastique-collecteur/afficheliste-conteneur-collecteur-publier-plastique.component').then(
            (m) => m.AffichelisteConteneurCollecteurPublierPlastiqueComponent
          ),
      },

      {
        path: 'Collecteur/views_collecteur/collecteur/liste-container/type/textille',
        data: {
          title: 'Conteneur de type Carton',
        },
        loadComponent: () =>
          import('./Collecteur/views_collecteur/afficheliste-conteneur-publier-dangereux-collecteur/afficheliste-conteneur-collecteur-publier-dangereux.component').then(
            (m) => m.AffichelisteConteneurCollecteurPublierDangeruxComponent
          ),
      },
      {
        path: 'Collecteur/views_collecteur/settings',
        loadChildren: () =>
          import('./Collecteur/views_collecteur/settings2/routes').then(
            (m) => m.routes
          ),
      },

      {
        path: 'Collecteur/views_collecteur/notifications',
        loadChildren: () =>
          import('./Collecteur/views_collecteur/notifications2/routes').then(
            (m) => m.routes
          ),
      },

      {
        path: 'Collecteur/views_collecteur/usersUsine/Collecteur/views_collecteur/users_details/:id',
        loadChildren: () =>
          import('./Collecteur/views_collecteur/users_details/routes').then(
            (m) => m.routes
          ),
      },

      {
        path: 'Collecteur/views_collecteur/notifications/Collecteur/views_collecteur/usersUsine/Collecteur/views_collecteur/users_details',
        loadChildren: () =>
          import('./Collecteur/views_collecteur/users_details/routes').then(
            (m) => m.routes
          ),
      },



      {
        path: 'Collecteur/views_collecteur/list-demande/Collecteur/views_collecteur/users_details/:id',
        loadChildren: () =>
          import('./Collecteur/views_collecteur/users_details/routes').then(
            (m) => m.routes
          ),
      },
      {
        path: 'collecteur/wastes',
        data: {
          title: 'dechets',
        },
        loadComponent: () =>
          import('./Collecteur/views_collecteur/wastes/waste.component').then(
            (m) => m.WasteComponent
          ),
      },

      {
        path: 'collecteur/wastes',
        data: {
          title: 'dechets',
        },
        loadComponent: () =>
          import('./Collecteur/views_collecteur/wastes/waste.component').then(
            (m) => m.WasteComponent
          ),
      },

      {
        path: 'collecteur/waste_movement',
        data: {
          title: 'waste_movement',
        },
        loadComponent: () =>
          import(
            './Collecteur/views_collecteur/waste_movement/waste.component'
          ).then((m) => m.WasteComponent),
      },

      {
        path: 'collecteur/liste-conteneur',

        data: {
          title: 'Liste Conteneur de dechets acquis',
        },
        loadComponent: () =>
          import(
            './Collecteur/views_collecteur/afficheliste-conteneur-collecteur/afficheliste-conteneur-collecteur.component'
          ).then((m) => m.AffichelisteConteneurCollecteurComponent),
      },

      {
        path: 'Collecteur/views_collecteur/usersUsine/Collecteur/views_collecteur/users_details/collecteur/liste-publier-carton-conteneur',

        data: {
          title: 'Liste Conteneur de dechets carton',
        },
        loadComponent: () =>
          import(
            './Collecteur/views_collecteur/afficheliste-conteneur-publier-carton-collecteur/afficheliste-conteneur-collecteur-publier-carton.component'
          ).then(
            (m) => m.AffichelisteConteneurCollecteurPublierCartonComponent
          ),
      },

      {
        path: 'Collecteur/views_collecteur/notifications/Collecteur/views_collecteur/usersUsine/Collecteur/views_collecteur/users_details/collecteur/liste-publier-carton-conteneur',
        data: {
          title: 'Liste Conteneur de dechets carton',
        },
        loadComponent: () =>
          import(
            './Collecteur/views_collecteur/afficheliste-conteneur-publier-carton-collecteur/afficheliste-conteneur-collecteur-publier-carton.component'
          ).then(
            (m) => m.AffichelisteConteneurCollecteurPublierCartonComponent
          ),
      },

      {
        path: 'Collecteur/views_collecteur/usersUsine/Collecteur/views_collecteur/users_details/:id/collecteur/liste-container/:key',

        data: {
          title: 'Liste Conteneur',
        },
        loadComponent: () =>
          import(
            './Collecteur/views_collecteur/afficheliste-conteneur-publier-textille-collecteur/afficheliste-conteneur-collecteur-publier-textille.component'
          ).then(
            (m) => m.AffichelisteConteneurCollecteurPublierTextilleComponent
          ),
      },

      {
        path: 'Collecteur/views_collecteur/notifications/Collecteur/views_collecteur/usersUsine/Collecteur/views_collecteur/users_details/collecteur/liste-publier-textile-conteneur',

        data: {
          title: 'Liste Conteneur de dechets textile',
        },
        loadComponent: () =>
          import(
            './Collecteur/views_collecteur/afficheliste-conteneur-publier-textille-collecteur/afficheliste-conteneur-collecteur-publier-textille.component'
          ).then(
            (m) => m.AffichelisteConteneurCollecteurPublierTextilleComponent
          ),
      },

      {
        path: 'Collecteur/views_collecteur/usersUsine/Collecteur/views_collecteur/users_details/collecteur/liste-publier-dangereux-conteneur',

        data: {
          title: 'Liste Conteneur de dechets dangereux',
        },
        loadComponent: () =>
          import(
            './Collecteur/views_collecteur/afficheliste-conteneur-publier-dangereux-collecteur/afficheliste-conteneur-collecteur-publier-dangereux.component'
          ).then(
            (m) => m.AffichelisteConteneurCollecteurPublierDangeruxComponent
          ),
      },

      {
        path: 'Collecteur/views_collecteur/notifications/Collecteur/views_collecteur/usersUsine/Collecteur/views_collecteur/users_details/collecteur/liste-publier-dangereux-conteneur',

        data: {
          title: 'Liste Conteneur de dechets dangereux',
        },
        loadComponent: () =>
          import(
            './Collecteur/views_collecteur/afficheliste-conteneur-publier-dangereux-collecteur/afficheliste-conteneur-collecteur-publier-dangereux.component'
          ).then(
            (m) => m.AffichelisteConteneurCollecteurPublierDangeruxComponent
          ),
      },

      {
        path: 'Collecteur/views_collecteur/notifications/Collecteur/views_collecteur/usersUsine/Collecteur/views_collecteur/users_details/collecteur/liste-publier-plastique-conteneur',

        data: {
          title: 'Liste Conteneur de dechets plastique',
        },
        loadComponent: () =>
          import(
            './Collecteur/views_collecteur/afficheliste-conteneur-publier-plastique-collecteur/afficheliste-conteneur-collecteur-publier-plastique.component'
          ).then(
            (m) => m.AffichelisteConteneurCollecteurPublierPlastiqueComponent
          ),
      },

      {
        path: 'Collecteur/views_collecteur/notifications/Collecteur/views_collecteur/usersUsine/Collecteur/views_collecteur/users_details/collecteur/liste-publier-plastique-conteneur',

        data: {
          title: 'Liste Conteneur de dechets plastique',
        },
        loadComponent: () =>
          import(
            './Collecteur/views_collecteur/afficheliste-conteneur-publier-plastique-collecteur/afficheliste-conteneur-collecteur-publier-plastique.component'
          ).then(
            (m) => m.AffichelisteConteneurCollecteurPublierPlastiqueComponent
          ),
      },

      {
        path: 'add-depot-collecteur',

        data: {
          title: 'Ajouter Un Dépôt',
        },
        loadComponent: () =>
          import(
            './Collecteur/views_collecteur/create-depot-collecteur/create-depot-collecteur.component'
          ).then((m) => CreateDepotCollecteurComponent),
      },

      {
        path: 'collecteur/liste-depots',

        data: {
          title: 'Liste Des Dépôts',
        },
        loadComponent: () =>
          import(
            './Collecteur/views_collecteur/afficheliste-depot-collecteur/afficheliste-depot-collecteur.component'
          ).then((m) => AffichelisteDepotCollecteurComponent),
      },

      {
        path: 'depots/:id/edit',
        data: { title: 'modifier depot' },

        loadComponent: () =>
          import(
            './Collecteur/views_collecteur/update-depot-collecteur/update-depot-collecteur.component'
          ).then((m) => UpdateDepotCollecteurComponent),
      },

      {
        path: 'conteneur/:id/edit',
        data: { title: 'modifier conteneur' },

        loadComponent: () =>
          import(
            './Collecteur/views_collecteur/update-conteneur-collecteur/update-conteneur-collecteur.component'
          ).then((m) => UpdateConteneurCollecteurComponent),
      },
      {
        path: 'collecteur/liste-stock-conteneur',
        data: {
          title: 'stock de  Conteneurs de dechets',
        },
        loadComponent: () =>
          import(
            './Collecteur/views_collecteur/afficheliste-stock-conteneur-collecteur/afficheliste-stock-conteneur-collecteur.component'
          ).then((m) => m.AffichelisteStockConteneurCollecteurComponent),
      },
    ],
  },

  {
    path: '',
    component: DefaultLayoutComponent3,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'recycler/views_recycler/users',
        loadChildren: () =>
          import('./recycler/views_recycler/users/routes').then(
            (m) => m.routes
          ),
      },

      {
        path: 'recycler/views_recycler/notifications/recycler/views_recycler/users',
        loadChildren: () =>
          import('./recycler/views_recycler/users/routes').then(
            (m) => m.routes
          ),
      },

      {
        path: 'recycler/views_recycler/recycler/liste-container/type/carton',
        data: {
          title: 'Conteneur de type Carton',
        },
        loadComponent: () =>
          import('./recycler/views_recycler/afficheliste-conteneur-publier-carton-recycleur/afficheliste-conteneur-recycleur-publier-carton.component').then(
            (m) => m.AffichelisteConteneurRecycleurPublierCartonComponent
          ),
      },
      {
        path: 'recycler/views_recycler/recycler/liste-container/type/plastique',
        data: {
          title: 'Conteneur de type plastique',
        },
        loadComponent: () =>
          import('./recycler/views_recycler/afficheliste-conteneur-publier-plastique-recycleur/afficheliste-conteneur-recycleur-publier-plastique.component').then(
            (m) => m.AffichelisteConteneurRecycleurPublierPlastiqueComponent
          ),
      },
      {
        path: 'recycler/views_recycler/recycler/liste-container/type/textille',
        data: {
          title: 'Conteneur de type textille',
        },
        loadComponent:() =>
          import('./recycler/views_recycler/afficheliste-conteneur-publier-dangereux-recycleur/afficheliste-conteneur-recycleur-publier-dangereux.component').then(
            (m) => m.AffichelisteConteneurRecycleurPublierDangeruxComponent
          ),
      },
      {
        path: 'recycler/views_recycler/waste',

        loadChildren: () =>
          import('./recycler/views_recycler/waste/routes').then(
            (m) => m.routes
          ),
      },
      {
        path: 'recycleur/waste_movement',
        data: {
          title: 'dechets',
        },
        loadComponent: () =>
          import('./recycler/views_recycler/waste/waste_movement/waste.component').then(
            (m) => m.WasteComponent
          ),
      },

      {
        path: 'recycler/views_recycler/wastes',
        data: {
          title: 'dechets',
        },
        loadComponent: () =>
          import('./recycler/views_recycler/waste/wastes/waste.component').then(
            (m) => m.WasteComponent
          ),
      },
      {
        path: 'recycler/views_recycler/waste_movement',
        data: {
          title: 'dechets',
        },
        loadComponent: () =>
          import(
            './recycler/views_recycler/waste/waste_movement/waste.component'
          ).then((m) => m.WasteComponent),
      },

      {
        path: 'recycler/views_recycler/settings',
        loadChildren: () =>
          import('./Admin/views_admin/settings/routes').then((m) => m.routes),
      },
      {
        path: 'recycler/views_recycler/waste/waste_processing',
        loadChildren: () =>
          import(
            './recycler/views_recycler/waste/waste_processing/waste.component'
          ).then((m) => m.WasteComponent),
      },
      {
        path: 'recycler/views_recycler/waste_mouvement_exception',
        loadComponent: () =>
          import(
            './recycler/views_recycler/waste/waste_mouvement_exception/waste.component'
          ).then((m) => m.WasteComponent),
      },
      {
        path: 'recycler/views_recycler/waste/details_dangaural_waste',
        loadChildren: () =>
          import(
            './recycler/views_recycler/waste/details_dangaural_waste/waste.component'
          ).then((m) => m.WasteComponent2),
      },
      /*
      {
        path: 'recycler/views_recycler/customers',
        loadChildren: () =>
          import('./recycler/views_recycler/customers/routes').then(
            (m) => m.routes
          ),
      },*/
      {
        path: 'recycler/views_recycler/notifications',
        loadChildren: () =>
          import('./recycler/views_recycler/notifications2/routes').then(
            (m) => m.routes
          ),
      },

      {
        path: 'recycler/views_recycler/waste/users_collectors/recycler/views_recycler/users_details/:id',
        loadChildren: () =>
          import('./recycler/views_recycler/users_details/routes').then(
            (m) => m.routes
          ),
      },

      {
        path: 'recycler/views_recycler/notifications/recycler/views_recycler/waste/users_collectors/recycler/views_recycler/users_details/:id',
        loadChildren: () =>
          import('./recycler/views_recycler/users_details/routes').then(
            (m) => m.routes
          ),
      },
      {
        path: 'recycler/views_recycler/updates',
        loadChildren: () =>
          import('./recycler/views_recycler/updates/routes').then(
            (m) => m.routes
          ),
      },
      /*
      {
        path: 'recycler/views_recycler/customer_list_contact',
        loadChildren: () =>
          import('./recycler/views_recycler/customer_list_contact/routes').then(
            (m) => m.routes
          ),
      },*/
      {
        path: 'recycler/views_recycler/waste/waste_ processing_movement',
        loadChildren: () =>
          import(
            './recycler/views_recycler/waste/waste_processing/waste.component'
          ).then((m) => m.WasteComponent),
      },
      {
        path: 'recycleur/liste-depots-recycleur',

        data: {
          title: 'Liste Des Dépôts',
        },
        loadComponent: () =>
          import(
            './recycler/views_recycler/afficheliste-depot-recycleur/afficheliste-depot-recycleur.component'
          ).then((m) => AffichelisteDepotRecycleurComponent),
      },

      {
        path: 'recycler/depots/:id/edit',
        data: { title: 'modifier depot' },

        loadComponent: () =>
          import(
            './recycler/views_recycler/update-depot-recycleur/update-depot-recycleur.component'
          ).then((m) => UpdateDepotRecycleurComponent),
      },

      {
        path: 'recycleur/liste-conteneur-receycleur',

        data: {
          title: 'stock de  Conteneur',
        },
        loadComponent: () =>
          import(
            './recycler/views_recycler/afficheliste-conteneur-recycleur/afficheliste-conteneur-recycleur.component'
          ).then((m) => m.AffichelisteConteneurRecycleurComponent),
      },
      {
        path: 'recycleur/liste-conteneur-acquis',
        data: {
          title: 'stock des  Conteneurs de déchets acquis',
        },
        loadComponent: () =>
          import(
            './recycler/views_recycler/afficheliste-conteneur-acquis-recycleur/afficheliste-conteneur-recycleur-aquis.component'
          ).then((m) => m.AffichelisteConteneurRecycleurAcquisComponent),
      },

      {
        path: 'add-depot-recycleur',

        data: {
          title: 'Ajouter Un Dépôt',
        },
        loadComponent: () =>
          import(
            './recycler/views_recycler/create-depot-recycleur/create-depot-recycleur.component'
          ).then((m) => CreateDepotRecycleurComponent),
      },

      {
        path: 'recycler/views_recycler/notifications/recycler/views_recycler/waste/users_collectors/recycler/views_recycler/users_details/recycleur/liste-publier-carton-conteneur',
        loadComponent: () =>
          import(
            './recycler/views_recycler/afficheliste-conteneur-publier-carton-recycleur/afficheliste-conteneur-recycleur-publier-carton.component'
          ).then((m) => m.AffichelisteConteneurRecycleurPublierCartonComponent),
      },
      {
        path: 'recycler/views_recycler/waste/users_collectors/recycler/views_recycler/users_details/recycleur/liste-publier-carton-conteneur',

        data: {
          title: 'Liste Conteneur de dechets carton',
        },
        loadComponent: () =>
          import(
            './recycler/views_recycler/afficheliste-conteneur-publier-carton-recycleur/afficheliste-conteneur-recycleur-publier-carton.component'
          ).then((m) => m.AffichelisteConteneurRecycleurPublierCartonComponent),
      },

      {
        path: 'recycler/views_recycler/waste/users_collectors/recycler/views_recycler/users_details/recycleur/liste-publier-textil-conteneur',

        data: {
          title: 'Liste Conteneur de dechets textile',
        },
        loadComponent: () =>
          import(
            './recycler/views_recycler/afficheliste-conteneur-publier-textille-recycleur/afficheliste-conteneur-recycleur-publier-textille.component'
          ).then(
            (m) => m.AffichelisteConteneurRecycleurPublierTextilleComponent
          ),
      },
      {
        path: 'recycler/views_recycler/waste/users_collectors/recycler/views_recycler/users_details/:id/recycler/liste-container/:key',
        data: {
          title: 'Liste Conteneur de dechets',
        },
        loadComponent: () =>
          import(
            './recycler/views_recycler/afficheliste-conteneur-publier-textille-recycleur/afficheliste-conteneur-recycleur-publier-textille.component'
          ).then(
            (m) => m.AffichelisteConteneurRecycleurPublierTextilleComponent
          ),
      },

      {
        path: 'recycler/views_recycler/waste/users_collectors/recycler/views_recycler/users_details/recycleur/liste-publier-dangereux-conteneur',

        data: {
          title: 'Liste Conteneur de dechets dangereux',
        },
        loadComponent: () =>
          import(
            './recycler/views_recycler/afficheliste-conteneur-publier-dangereux-recycleur/afficheliste-conteneur-recycleur-publier-dangereux.component'
          ).then(
            (m) => m.AffichelisteConteneurRecycleurPublierDangeruxComponent
          ),
      },
      {
        path: 'recycler/views_recycler/notifications/recycler/views_recycler/waste/users_collectors/recycler/views_recycler/users_details/recycleur/liste-publier-dangereux-conteneur',
        data: {
          title: 'Liste Conteneur de dechets dangereux',
        },
        loadComponent: () =>
          import(
            './recycler/views_recycler/afficheliste-conteneur-publier-dangereux-recycleur/afficheliste-conteneur-recycleur-publier-dangereux.component'
          ).then(
            (m) => m.AffichelisteConteneurRecycleurPublierDangeruxComponent
          ),
      },

      {
        path: 'recycler/views_recycler/waste/users_collectors/recycler/views_recycler/users_details/recycleur/liste-publier-plastique-conteneur',

        data: {
          title: 'Liste Conteneur de dechets plastique',
        },
        loadComponent: () =>
          import(
            './recycler/views_recycler/afficheliste-conteneur-publier-plastique-recycleur/afficheliste-conteneur-recycleur-publier-plastique.component'
          ).then(
            (m) => m.AffichelisteConteneurRecycleurPublierPlastiqueComponent
          ),
      },

      {
        path: 'recycler/views_recycler/notifications/recycler/views_recycler/waste/users_collectors/recycler/views_recycler/users_details/recycleur/liste-publier-plastique-conteneur',

        data: {
          title: 'Liste Conteneur de dechets plastique',
        },
        loadComponent: () =>
          import(
            './recycler/views_recycler/afficheliste-conteneur-publier-plastique-recycleur/afficheliste-conteneur-recycleur-publier-plastique.component'
          ).then(
            (m) => m.AffichelisteConteneurRecycleurPublierPlastiqueComponent
          ),
      },

      {
        path: 'recycler/stocker/:id/edit',
        data: { title: 'stocker conteneur de  déchets' },

        loadComponent: () =>
          import(
            './recycler/views_recycler/stocker-conteneur/stocker-conteneur.component'
          ).then((m) => StockerConteneurComponent),
      },



      {
        path: 'recycleur/Gerer-codes',

        data: {
          title: 'Gérer codes',
        },
        loadComponent: () =>
          import(
            './recycler/views_recycler/affichelistecodes-recycleur/affichelistecodesusine/affichelistecodesrecycleur.component'
          ).then((m) => AffichelistecodesrecycleurComponent),
      },

 {
        path: 'recycleur/codes/:id/edit',
        data: { title: 'modifier code' },

        loadComponent: () =>
          import(
            './recycler/views_recycler/update-code-recycleur/update-code-recycleur.component'
          ).then((m) => UpdateCodeRecycleurComponent),
      },


{
        path: 'add-Code-recycleur',

        data: {
          title: 'Ajouter Un Code',
        },
        loadComponent: () =>
          import(
            './recycler/views_recycler/create-codes-recycleur/create-codes-recycleur.component'
          ).then((m) => CreateCodesRecycleurComponent),
      },
    ],
  },

  {
    path: '',
    component: DefaultLayoutComponent4,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'Usine/views_usine/settings',
        loadChildren: () =>
          import('./Admin/views_admin/settings/routes').then((m) => m.routes),
      },
      {
        path: 'Usine/views_usine/usersUsine',
        loadChildren: () =>
          import('./Usine/views_usine/usersUsine/routes').then((m) => m.routes),
      },
      {
        path: 'Usine/views_usine/usersUsine/Usine/users_details',
        loadChildren: () =>
          import('./Usine/views_usine/users_details/routes').then(
            (m) => m.routes
          ),
      },
      {
        path: 'Usine/views_usine/notifications/Usine/views_usine/users_details',
        loadChildren: () =>
          import('./Usine/views_usine/users_details/routes').then(
            (m) => m.routes
          ),
      },

      {
        path: 'Usine/views_usine/notifications',
        loadChildren: () =>
          import('./Usine/views_usine/notifications/routes').then(
            (m) => m.routes
          ),
      },
      {
        path: 'Usine/views_usine/waste/wastes',
        data: {
          title: 'dechets',
        },
        loadComponent: () =>
          import('./Usine/views_usine/wastes/waste.component').then(
            (m) => m.WasteComponent
          ),
      },
      {
        path: 'Usine/waste_movement',
        data: {
          title: 'dechets',
        },
        loadComponent: () =>
          import('./Usine/views_usine/waste_movement/waste.component').then(
            (m) => m.WasteComponent
          ),
      },

      {
        path: 'Usine/views_usine/waste/plastic_waste',
        data: {
          title: 'dechets_carton',
        },
        loadComponent: () =>
          import(
            './Usine/views_usine/waste/plastic_waste/charts.component'
          ).then((m) => m.ChartsComponent),
      },

      {
        path: 'create-conteneur',

        data: {
          title: 'Ajouter Une Conteneur',
        },
        loadComponent: () =>
          import(
            './Usine/views_usine/create-conteneur-usine/create-conteneur-usine.component'
          ).then((m) => m.CreateConteneurUsineComponent),
      },


      {
        path: 'Usine/views_usine/list-demande/Usine/views_usine/users_details/:id',
        loadChildren: () =>
          import('./Usine/views_usine/users_details/routes').then(
            (m) => m.routes
          ),
      },

      {
        path: 'Usine/liste-conteneur',

        data: {
          title: 'Liste Conteneur',
        },
        loadComponent: () =>
          import(
            './Usine/views_usine/afficheliste-conteneur-usine/afficheliste-conteneur-usine.component'
          ).then((m) => m.AffichelisteConteneurUsineComponent),
      },
      {
        path: 'Usine/views_usine/list-demande',

        data: {
          title: 'Liste Des Demande',
        },
        loadComponent: () =>
          import('./Usine/views_usine/demande/demande.component').then(
            (m) => m.DemandeComponent
          ),
      },
      {
        path: 'Usine/add-dechets',

        data: {
          title: 'add-dechets',
        },
        loadComponent: () =>
          import(
            './Usine/views_usine/create-dechets/create-dechets.component'
          ).then((m) => CreateDechetsComponent),
      },

      {
        path: 'add-depot-usine',

        data: {
          title: 'Ajouter Un Dépôt',
        },
        loadComponent: () =>
          import(
            './Usine/views_usine/create-depot-usine/create-depot-usine.component'
          ).then((m) => CreateDepotUsineComponent),
      },

      {
        path: 'add-Code-usine',

        data: {
          title: 'Ajouter Un Code',
        },
        loadComponent: () =>
          import(
            './Usine/views_usine/createcodes-usine/createcodesusine/createcodesusine.component'
          ).then((m) => CreatecodesusineComponent),
      },

      {
        path: 'usine/liste-dechets',

        data: {
          title: 'liste-dechets',
        },
        loadComponent: () =>
          import(
            './Usine/views_usine/afficheliste-dechets/afficheliste-dechets.component'
          ).then((m) => AffichelisteDechetsComponent),
      },

      {
        path: 'Usine/liste-depots',

        data: {
          title: 'Liste Des Dépôts',
        },
        loadComponent: () =>
          import(
            './Usine/views_usine/afficheliste-depot-usine/afficheliste-depot-usine.component'
          ).then((m) => AffichelisteDepotUsineComponent),
      },
      {
        path: 'Usine/Gerer-codes',

        data: {
          title: 'Gérer codes',
        },
        loadComponent: () =>
          import(
            './Usine/views_usine/affichelistecodes-usine/affichelistecodesusine/affichelistecodesusine.component'
          ).then((m) => AffichelistecodesusineComponent),
      },

     

      {
        path: 'usine/dechets/:id/edit',
        data: { title: 'modifier dechets' },
        loadComponent: () =>
          import(
            './Usine/views_usine/update-dechet/update-dechet.component'
          ).then((m) => UpdateDechetComponent),
      },
      {
        path: 'usine/depots/:id/edit',
        data: { title: 'modifier depot' },

        loadComponent: () =>
          import(
            './Usine/views_usine/update-depot/update-depot.component'
          ).then((m) => UpdateDepotUsineComponent),
      },

      {
        path: 'usine/codes/:id/edit',
        data: { title: 'modifier code' },

        loadComponent: () =>
          import(
            './Usine/views_usine/update-code-usine-component/update-code-usine-component.component'
          ).then((m) => UpdateCodeUsineComponentComponent),
      },
      {
        path: 'update-container/:id',
        
        loadComponent: () =>
          import(
            './Usine/views_usine/update-conteneur-usine/update-conteneur-usine.component')
            .then((m)=>UpdateConteneurUsineComponent )
      }
    ],
  },

  {
    path: 'authen',
    loadChildren: () =>
      import('./auth/auth-routing.module').then((m) => m.AuthRoutingModule),
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },


  {
    path: 'Collecteur/views_collecteur/usersUsine/Collecteur/views_collecteur/users_details/:userId/collecteur/liste-container/:key',
    component: AffichelisteConteneurCollecteurPublierTextilleComponent
  },

 
  {
    path: 'Collecteur/views_collecteur/usersUsine/Collecteur/views_collecteur/collecteur/liste-container/:key',
    component: AffichelisteConteneurCollecteurPublierTextilleComponent
  },

 


];
