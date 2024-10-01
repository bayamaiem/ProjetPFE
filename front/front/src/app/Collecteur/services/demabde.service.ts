import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://127.0.0.1:8001/api';

@Injectable({
  providedIn: 'root',
})
export class DemandeService {
  constructor(private http: HttpClient) {}

  getAllDemande(): Observable<any> {
    return this.http.get(`${AUTH_API}/affichedemandecollecteur`);
  }

  postDemande(body: any,conteneurId:number ,IDdemandeur:number
  ): Observable<any> {
    return this.http.post(`${AUTH_API}/demande/${conteneurId}/${IDdemandeur}`, body);
  }
  updateDemandeEtat(id: any, etat: any): Observable<any> {
    const body = {
      id: id,
      etat: etat,
    };
    return this.http.put<any>(`${AUTH_API}/demandes/${id}`, body);
  }
}
