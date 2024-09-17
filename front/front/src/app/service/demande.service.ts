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
    return this.http.get(`${AUTH_API}/demandes`);
  }

  postDemande(body: any,conteneurId:number): Observable<any> {
    return this.http.post(`${AUTH_API}/demande/${conteneurId}`, body);
  }
}
