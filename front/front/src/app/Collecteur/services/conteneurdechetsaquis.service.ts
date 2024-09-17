import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { MouvementResponse2 } from 'src/app/recycler/views_recycler/models/movement';
import { MouvementResponse, MovementWrapper} from 'src/app/Usine/views_usine/models/mouvement';

@Injectable({
  providedIn: 'root'
})
export class ConteneurdechetsaquisService {
  private apiUrl = 'http://127.0.0.1:8001/api'; // Changez cela avec l'URL de votre API

  constructor(private http: HttpClient) { }

  getUser(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${userId}`).pipe(
      tap(response => console.log(`Réponse API pour l'utilisateur ${userId}:`, response))
    );
  }

  getMouvements(): Observable<MouvementResponse> {
    return this.http.get<MouvementResponse>(`${this.apiUrl}/movements`);
  }

  getUserByName(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/by-username/${username}`);
  }
  getMovementsByDemandeur(): Observable< MouvementResponse> {
    return this.http.get< MouvementResponse>(`${this.apiUrl}/movements/by-demandeur`).pipe(
      tap(response => console.log('Filtered Movements API Response:', response)) // Debug log
    );
  }

  getMovementsByDemandeurstocker(): Observable< MouvementResponse> {
    return this.http.get< MouvementResponse>(`${this.apiUrl}/movements/by-demandeur/stocker`).pipe(
      tap(response => console.log('Filtered Movements API Response:', response)) // Debug log
    );
  }

  /*getMovementsByDemandeurRecycleur(): Observable<MouvementResponse2> {
    return this.http.get<MouvementResponse2>(`${this.apiUrl}/movements/by-demandeur-recycleur`).pipe(
      tap(response => console.log('Filtered Movements API Response:', response)) // Debug log
    );
  }*/
  
    getMovementsByDemandeurRecycleur(page: number): Observable<MouvementResponse2> {
      return this.http.get<MouvementResponse2>(`${this.apiUrl}/movements/by-demandeur-recycleur/${page}`);
    }

    getAllMovementsByDemandeurRecycleur(): Observable<MouvementResponse2> {
      return this.http.get<MouvementResponse2>(`${this.apiUrl}/movements/by-demandeur-recycleur`);
    }

  getMovementsByDemandeurRecycleurnonTransformer(): Observable<MouvementResponse2> {
    return this.http.get<MouvementResponse2>(`${this.apiUrl}/movements/by-demandeur-recycleur/non_transformer`).pipe(
      tap(response => console.log('Filtered Movements API Response:', response)) // Debug log
    );
  }
  
  

  
}
