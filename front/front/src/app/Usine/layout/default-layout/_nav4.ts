import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: 'Usine/views_usine/waste/wastes',
    iconComponent: { name: 'cilHome' },
  },

  {
   /* name: 'Demandes',
    url: '',
    children: [*/
      
        name: 'List Demande',
        url: 'Usine/views_usine/list-demande',
        icon: 'nav-icon-bullet',
      },
  /*  ],*/

  /*
  {
    name: 'users',
    url: 'Usine/views_usine/waste',
    iconComponent: { name: 'cilUser' },
    children: [
      {
        name: 'factories',
        url: 'Usine/views_usine/waste/users_factories',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'collectors',
        url: 'Usine/views_usine/waste/users_collectors',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'recyclers',
        url: 'Usine/views_usine/waste/users_recyclers',
        icon: 'nav-icon-bullet'
      },
    ]
  },


  {
    name: 'waste',
    url: '/waste',
    iconComponent: { name: 'cilMenu' },
    children: [
      {
        name: 'dechets_carton',
        url: 'Usine/views_usine/waste/dechets_carton',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'plastic waste',
        url: 'Usine/views_usine/waste/plastic_waste',
        icon: 'nav-icon-bullet'
      },

      {
        name: 'textile waste',
        url: 'Usine/views_usine/waste/textile_waste',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'dangaural wastes',
        url: 'Usine/views_usine/waste/dangaural_wastes',
        icon: 'nav-icon-bullet'
      }
    ]
  },*/
];
