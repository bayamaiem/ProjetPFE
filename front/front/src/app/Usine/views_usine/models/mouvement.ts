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
  lieu:string;
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
export interface Movement {
  IDdemandeur: number;
  IDdemandeurrecycleur: number;
  demandeurrecycleur:Fournisseur
  IDfournisseur: number;
  conteneur: Conteneur;
  conteneur_id: number;
  created_at: string;
  conteneur_code: string;
  conteneur_type: string | null;
  conteneurPrix:any;
  date: string;
  hour: string;
  id: number;
  fournisseur2: Fournisseur;
  is_published: number;
  place: string;
  updated_at: string;
  fournisseur: Fournisseur;
  depot:Depot;
  poids:string;
}

export interface MovementWrapper {
demandeurrecycleur: any;
  movement: Movement;
  conteneur_type: string | null;
  conteneur_code:string;
  IDdemandeur:number;
  IDfournisseur:number;
  poids:number;
  conteneurPrix: number; // or the appropriate type


}

export interface MouvementResponse {
  movements: MovementWrapper[];
}

export interface GroupedMovement {
  code: string;
  id: number;
  id_conteneur: number;
  conteneurPrix :any,
  is_published: any;
  conteneur_type: string;
  place: string;
  date: string;
  hour: string;
  prixcollecteur: number;
  movement: Movement[]; // Update this line
  count: number;
  fournisseuraddress:string;
  fournisseurName:string;
  fournisseurlastName:string;
  poids:number;
  conteneur_code: string;
  fournisseur: Fournisseur;
  depot: Depot;
  depotId: any;
  estStoker: number;
  updated_at?: string | undefined;
  formatted_updated_at?: string;
  data: MovementWrapper[];
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
  CreatedBy: string | null;
  created_at: string;
  updated_at: string;
  phone_number: number;
  certificat: string | null;
  address: string;
  activite: string;
}
