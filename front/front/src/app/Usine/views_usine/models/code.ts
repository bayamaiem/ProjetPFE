
export interface Dechet {
  id: number;
  type: string;
  // other properties if any
}

export interface Code {
    id: number;
    code: string;
    user_id:number;
    dechet_id:number;
    dechet: Dechet;
    created_at: Date;
    updated_at: Date;
  }
  