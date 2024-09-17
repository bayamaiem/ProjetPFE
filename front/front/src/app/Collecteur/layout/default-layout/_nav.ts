import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: 'collecteur/wastes',
    
  },
  
  {
    name: 'Usines',
    url: 'Collecteur/views_collecteur/usersUsine',
    iconComponent: { name: 'cilUser' },
    
  },
  


    {
      name: 'List Demande',
      url: 'Collecteur/views_collecteur/list-demande',
      icon: 'nav-icon-bullet',
    },


    {
      name: 'Gérer Les Dépots de Dechets',
      url: 'collecteur/liste-depots',
      icon: 'nav-icon-bullet',
    },

    {
      name: 'Gérer Les Conteneurs',
      url: 'collecteur/liste-stock-conteneur',
      icon: 'nav-icon-bullet',
    },


    {
      name:'Mouvement Des Conteneurs',
      url: 'collecteur/waste_movement',
      icon: 'nav-icon-bullet',
    },

  
    {
      name: 'List Conteneur',
      url: 'Collecteur/views_collecteur/list-demande',
      iconComponent: { name: 'cilMenu' },
  
      children: [
        {
          name: 'carton',
          url: 'Collecteur/views_collecteur/collecteur/liste-container/type/carton',
          icon: 'nav-icon-bullet'
        },
  
        {
          name: 'Plastique',
          url: 'Collecteur/views_collecteur/collecteur/liste-container/type/plastique',
          icon: 'nav-icon-bullet'
        },
  
  
        {
          name: 'textille',
          url: 'Collecteur/views_collecteur/collecteur/liste-container/type/textille',
          icon: 'nav-icon-bullet'
        },
      
      ]
    },
 /*
  {
    name: 'dechets',
    url: '/base',
    iconComponent: { name: 'cilMenu' },
    children: [
      {
        name: 'déchets carton',
        url: 'Collecteur/views_collecteur/waste/cardboard_waste',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'déchets plastique',
        url: 'Collecteur/views_collecteur/waste/plastic_waste',
        icon: 'nav-icon-bullet'
      },

      {
        name: 'déchets textile',
        url: 'Collecteur/views_collecteur/waste/textile_waste',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'déchets dangereux',
        url: 'Collecteur/views_collecteur/waste/dangaural_wastes',
        icon: 'nav-icon-bullet'
      }
    ]
  },*/

  ];