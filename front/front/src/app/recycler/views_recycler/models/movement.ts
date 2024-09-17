// src/app/shared/models/mouvement.ts
export interface Dechet {
  id: number;
  type: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  user_role: string;
  value: number | null;
}

export interface Depot {
  id: number;
  nom: string;
  lieu: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface Conteneur {
  id: number;
  code: string;
  user_id: number;
  depot_id: number;
  dechet_id: number;
  created_at: string;
  updated_at: string;
  is_transformed: number;
  prix: number;
  dechet: Dechet;
}

export interface Fournisseur {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: string;
  avatar: string;
  active: boolean;
  createdBy: string | null;
  created_at: string;
  updated_at: string;
  phone_number: number;
  certificat: string | null;
  address: string;
  activite: string;
}



export interface Movement {
  demandeurId: number;
  demandeurrecycleurId: number;
  fournisseurId: number;
  conteneur: Conteneur;
  conteneur_id: number;
  created_at: string;
  date: string;
  hour: string;
  id: number;
  is_published: number;
  place: string;
  updated_at: string;
  fournisseur: Fournisseur;
  depot: Depot;
  estStoker: number,
  newdepot: number;
  date_stockage:Date;
  IDdemandeur: number;
  IDdemandeurrecycleur: number;
  demandeurrecycleur:Fournisseur
  IDfournisseur: number;
  conteneur_code: string;
  conteneur_type: string | null;

  fournisseur2: Fournisseur;
}

export interface MovementWrapper {
  movement: Movement;
  conteneur_type: string | null;
  fournisseur_name?: string | null;
  demandeurrecycleur: any;
  

}

export interface MouvementResponse2 {
  movements: MovementWrapper[];
  current_page: number;
  total_pages: number;
  total_items: number;
}



export interface GroupedMovement {
  estStoker: any;
  is_published: any;
  movement: any[];
  code: string;
  id: number;
  conteneur_type: string;
  place: string;
  date: string;
  hour: string;
  count: number;
  fournisseur: Fournisseur;
  depot: Depot;
  depotId: number;
  id_conteneur: number;
  prixcollecteur: number;
  usine_name: string;
  firstNameCollecteur: string;
  lastNameCollecteur: string;
  datecollecteur: string;
  conteneur_code: string;
  conteneurPrix: any;
  data: MovementWrapper[];
  addresscollecteur: string;
  hourcollecteur: string;
  adressusine: string;
}

export interface GroupedMovement2 {
  code: string;
  id :number
  id_conteneur: number; // Add this line
  conteneur_type: string;
  place: string;
  date: string;
  hour: string;
  is_transformed:number;
conteneur_code:string;
  movement:Movement;
  estStoker?: number; 
  count: number;
  fournisseur2: Fournisseur;
  depot: Depot;
  updated_at?: string | undefined;
    formatted_updated_at?: string; // Ajoutez cette ligne
    depotId: number;
  

}
