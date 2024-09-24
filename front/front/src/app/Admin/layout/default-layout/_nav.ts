import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: 'Admin/views_admin/waste/wastes',
  },

  {
    name: 'utilisateur',
    url: 'Admin/views_admin/waste',
    iconComponent: { name: 'cilUser' },
    children: [
      {
        name: 'Usines',
        url: 'Admin/views_admin/waste/users_factories',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Collecteurs',
        url: 'Admin/views_admin/waste/users_collectors',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Recycleur',
        url: 'Admin/views_admin/waste/users_recyclers',
        icon: 'nav-icon-bullet',
      },
    ],
  },

  /*
  {
    name: 'dechets',
    url: '/waste',
    iconComponent: { name: 'cilMenu' },
    children: [
      {
        name: 'dechets carton',
        url: 'Admin/views_admin/waste/cardboard_waste',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'dechets plastique',
        url: 'Admin/views_admin/waste/plastic_waste',
        icon: 'nav-icon-bullet'
      },

      {
        name: 'dechets textille',
        url: 'Admin/views_admin/waste/textile_waste',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'dechets dangereux',
        url: 'Admin/views_admin/waste/dangaural_wastes',
        icon: 'nav-icon-bullet'
      }
    ]
  },*/
];
