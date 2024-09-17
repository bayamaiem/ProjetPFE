import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Conteneur } from '../models/conteneur';
import { MouvementResponse, MovementWrapper } from 'src/app/Usine/views_usine/models/mouvement';
@Injectable({
  providedIn: 'root'
})
export class ConteneurService {

 private apiUrl = 'http://127.0.0.1:8001/api';

  constructor(private http: HttpClient) { }
  
  getPublishedConteneurByTypeAndUser(dechetType: string, userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/published-conteneurs/${dechetType}/${userId}`);
  }

   
  getPublishedConteneurByType(dechetType: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getPublishedConteneurByTypetotal/${dechetType}`);
  }

  
  addMovement(body:any, conteneurID: number) {
    return this.http.post(`${this.apiUrl }/conteneurs/${conteneurID}/movements2`, body );
  }
  getConteneurs(): Observable<Conteneur[]> {
    return this.http.get<Conteneur[]>(`${this.apiUrl}/conteneurs`).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  private apiUrl2 = 'http://127.0.0.1:8001/api/all/movements/collecteur'; // Remplacez par l'URL correcte de votre API


  getMouvements(): Observable<MouvementResponse> {
    return this.http.get<MouvementResponse>(this.apiUrl2);
  }
  PublierConteneurMouvement(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/PublierConteneurMouvement/${id}`, {});
  }

  
  Est_venduCollecteur(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Est_venduCollecteur/${id}`, {});
  }
  getGroupedMouvements(): Observable<any> {
    return this.getMouvements().pipe(
      map(response => {
        const grouped: { [key: string]: { count: number; data: MovementWrapper } } = {};
        response.movements.forEach(curr => {
          const userId = curr.movement.IDdemandeurrecycleur;
          const conteneurcode = curr.movement.conteneur_code;
          const  conteneur_type = curr.movement.conteneur.dechet.type;
          const  conteneur_date = curr.movement.date;


          const key = `${userId}-${conteneurcode}-${ conteneur_type}-${conteneur_date}`;
          if (!grouped[key]) {
            grouped[key] = { count: 0, data: curr };
          }
          grouped[key].count++;
        });
        return Object.values(grouped);
      })
    );
  }

  estdemandercollecteur(id : number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/estdemanderrecycleur/${id}`, {});
  }
}

