import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Conteneur } from '../models/conteneur';

const AUTH_API = 'http://127.0.0.1:8001/api';
@Injectable({
  providedIn: 'root',
})
export class ConteneurService {
  constructor(private http: HttpClient) {}

  saveConteneur(inputData: any): Observable<any> {
    return this.http.post(AUTH_API + '/conteneurs', inputData).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
  publishConteneur(id: number): Observable<any> {
    return this.http.patch<any>(`${AUTH_API}/conteneur/publier/${id}`, {});
  }
  getConteneurs2(): Observable<Conteneur[]> {
    return this.http.get<Conteneur[]>(AUTH_API + '/conteneurs').pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
  getConteneurs(page: number = 1, itemsPerPage: number = 10): Observable<Conteneur[]> {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('itemsPerPage', itemsPerPage.toString());

    return this.http.get<Conteneur[]>(AUTH_API + '/conteneurs', { params }).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
  getConteneur(conteneurId: number): Observable<string> {
    const url = `${AUTH_API}/conteneur/${conteneurId}`;
    return this.http.get<string>(url).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  updateConteneur(inputData: object, conteneurId: any): Observable<any> {
    const url = `${AUTH_API}/conteneur/${conteneurId}/edit`;
    return this.http.put(url, inputData).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  destroyConteneur(conteneurId: number): Observable<any> {
    const url = `${AUTH_API}/conteneur/${conteneurId}/delete`;
    return this.http.delete(url).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
