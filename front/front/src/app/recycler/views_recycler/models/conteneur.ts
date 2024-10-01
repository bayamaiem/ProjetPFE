export interface Conteneur {
  id: number;
  code: string;
  id_usine: number;
  id_collecteur: number;
  dechet_id: number;
  depot_id: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  poids: number; // Add this line to include the 'poids' property
}
