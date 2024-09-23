
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://127.0.0.1:8001/api';

@Injectable({
  providedIn: 'root'
})
export class DechetsService {

  constructor(private http: HttpClient) {}

  getTypeDechets(): Observable<any> {
    return this.http.get(`${AUTH_API}/dechets`);
  }

  
  AjouterDechets(dechetData: any): Observable<any> {
    return this.http.post(`${AUTH_API}/dechet`,dechetData);
  }

  
  deleteDechet(dechetId: number): Observable<any> {
    return this.http.delete(`${AUTH_API}/dechet/${dechetId}/delete`);
  }

  updateDechet(dechetId: number,inputData: object): Observable<any> {
    return this.http.put(`${AUTH_API}/dechet/${dechetId}/edit`,inputData);
  }
}
