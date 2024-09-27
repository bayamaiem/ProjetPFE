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

  getConteneurs(page: number = 1, itemsPerPage: number = 10): Observable<Conteneur[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('itemsPerPage', itemsPerPage.toString());
  
    return this.http.get<Conteneur[]>(AUTH_API + '/conteneurs',{params}).pipe(
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

  transformContainer(id: Number): Observable<any> {
    const body = {
      id: id,
    };
    return this.http.patch(`${AUTH_API}/conteneur/${id}/transformation`, body);
  }

  getContainerDechetSumType(): Observable<any> {
    return this.http.get(`${AUTH_API}/conteneurs/sums`);
  }
  getContainerDechetSumTypeAdmin(): Observable<any> {
    return this.http.get(`${AUTH_API}/conteneurs/sums/admin`);
  }

  getUserCounts(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${AUTH_API}/user-counts`);
  }

  getTypeSumscollecteur(): Observable<any> {
    return this.http.get(`${AUTH_API}/getTypeSumscollecteur/sums`);
  }

  getContainerByDechetType(dechetId: Number): Observable<any> {
    return this.http.get(`${AUTH_API}/conteneurs/${dechetId}`);
  }

  addMovement(body:any, conteneurID: number) {
    return this.http.post(`${AUTH_API}/conteneurs/${conteneurID}/movements`, body );
  }

  getMovementsByTypeAndUser(dechetType: string, userId: number): Observable<any> {
    return this.http.get(`${AUTH_API}/getMovementsByTypeAndUser/${dechetType}/${userId}`);
  }

  getMovementsByType(dechetType: string): Observable<any> {
    return this.http.get(`${AUTH_API}/getMovementsByType/${dechetType}`);
  }

  stockerContainer(id: Number): Observable<any> {
    const body = {
      id: id,
    };
    return this.http.patch(`${AUTH_API}/conteneur/${id}/transformation`, body);
  }

  getTypeSumsByDemandeurRecycleur(): Observable<any> {
    return this.http.get(`${AUTH_API}/getTypeSumsByDemandeurRecycleur/sums`);
  }

  getTypeSumscollecteurByID(id:number): Observable<any> {
    return this.http.get(`${AUTH_API}/getTypeSumscollecteurByID/sums/${id}`);
  }
  getTypeSumsusinebyID(id:number): Observable<any> {
    return this.http.get(`${AUTH_API}/getTypeSumsusinebyID/sums/${id}`);
  }

  
  Est_venduUsine(id: number): Observable<any> {
    return this.http.post<any>(`${AUTH_API}/Est_venduUsine/${id}`, {});
  }
  

 
}
