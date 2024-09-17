import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dechet } from '../models/dechet';

const AUTH_API = 'http://127.0.0.1:8001/api';

@Injectable({
  providedIn: 'root',
})
export class DechetsService {
  constructor(private httpClient: HttpClient) {}

  saveDechets(inputData: any): Observable<any> {
    return this.httpClient.post(AUTH_API + '/dechets', inputData);
  }

  getDechets(): Observable<any> {
    return this.httpClient.get<Dechet[]>(AUTH_API + '/dechets');
  }

  getCodes(): Observable<any> {
    return this.httpClient.get<Dechet[]>(AUTH_API + '/getCodes');
  }

  getDechet(dechetId: number): Observable<Dechet> {
    return this.httpClient.get<Dechet>(`${AUTH_API}/dechet/${dechetId}`);
  }

  updateDechet(inputData: object, dechetId: number): Observable<any> {
    return this.httpClient.put(
      `${AUTH_API}/dechet/${dechetId}/edit`,
      inputData
    );
  }

  destroyDechet(dechetId: number): Observable<any> {
    return this.httpClient.delete(`${AUTH_API}/dechet/${dechetId}/delete`);
  }
}
