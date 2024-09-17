import { INavData } from '@coreui/angular';
export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: 'recycler/views_recycler/wastes',
    iconComponent: { name: 'cilHome' },
  },
  {
    name: 'collecteurs',
    url: 'recycler/views_recycler/waste/users_collectors',
    icon: 'nav-icon-bullet'
    
  },


  {
    name: 'Conteneurs De Déchets Transformés',
    url: 'recycler/views_recycler/waste/waste_processing',
    icon: 'nav-icon-bullet'
    
  },


  {
    name: 'Gérer les depots de déchets',
    url: 'recycleur/liste-depots-recycleur',
    icon: 'nav-icon-bullet'
    
  },

  {
    name: 'Stock Des Conteneurs De dechets',
    url: 'recycleur/liste-conteneur-acquis',
    icon: 'nav-icon-bullet'
    
  },
  

  {
    name: 'List Conteneur',
    url: 'recycler/views_recycler/list-demande',
    iconComponent: { name: 'cilMenu' },

    children: [
      {
        name: 'carton',
        url: 'recycler/views_recycler/recycler/liste-container/type/carton',
        icon: 'nav-icon-bullet'
      },

      {
        name: 'Plastique',
        url: 'recycler/views_recycler/recycler/liste-container/type/plastique',
        icon: 'nav-icon-bullet'
      },


      {
        name: 'textille',
        url: 'recycler/views_recycler/recycler/liste-container/type/textille',
        icon: 'nav-icon-bullet'
      },
    
    ]
  }
  /*
  {
    name: 'dechets',
    iconComponent: { name: 'cilMenu' },
    children: [
      {
        name: 'déchets carton',
        url: 'recycler/views_recycler/waste/cardboard_waste',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'déchets plastique',
        url: 'recycler/views_recycler/waste/plastic_waste',
        icon: 'nav-icon-bullet'
      },

      {
        name:'déchets textile',
        url: 'recycler/views_recycler/waste/textile_waste',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'déchets dangereux',
        url: 'recycler/views_recycler/waste/dangaural_wastes',
        icon: 'nav-icon-bullet'
      }
    ]
  },*/
];
