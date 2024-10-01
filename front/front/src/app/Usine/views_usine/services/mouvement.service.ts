import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { MouvementResponse, MovementWrapper} from '../models/mouvement';
import { map } from 'rxjs/operators';


const AUTH_API = 'http://127.0.0.1:8001/api';

@Injectable({
  providedIn: 'root'
})
export class MouvementService {

  constructor(private http: HttpClient) {}
  private apiUrl = 'http://127.0.0.1:8001/api/movements'; // Remplacez par l'URL correcte de votre API


 

  getMouvements(): Observable<MouvementResponse> {
    return this.http.get<MouvementResponse>(this.apiUrl);
  }

  getGroupedMouvements(): Observable<any> {
    return this.getMouvements().pipe(
      map(response => {
        const grouped: { [key: string]: { count: number; data: MovementWrapper } } = {};
        response.movements.forEach(curr => {
          const userId = curr.movement.IDdemandeur;
          const conteneurcode = curr.movement.conteneur_code;
          const  conteneur_type = curr.movement.conteneur.dechet.type;
          const  conteneur_date = curr.movement.date;
          const  conteneur_Prix = curr.movement.conteneur.prix;
          const conteneurPoids = curr.movement.conteneur.poids;

         /* const  conteneur_Poids = curr.movement.conteneur.poids;*/


          const key = `${userId}-${conteneurcode}-${ conteneur_type}-${conteneur_date}-${conteneur_Prix}${conteneurPoids}`;
          if (!grouped[key]) {
            grouped[key] = { count: 0, data: curr };
          }
          grouped[key].count++;
        });
        return Object.values(grouped);
      })
    );
  }
  
}
