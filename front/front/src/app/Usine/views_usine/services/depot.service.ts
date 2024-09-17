import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Depot } from '../models/depot';

const AUTH_API = 'http://127.0.0.1:8001/api';

@Injectable({
  providedIn: 'root',
})
export class DepotService {
  constructor(private httpClient: HttpClient) {}

  saveDepot(inputData: any): Observable<any> {
    return this.httpClient.post(AUTH_API + '/depot', inputData);
  }

  getDepots(userId: number): Observable<Depot[]> {
    return this.httpClient.get<Depot[]>(`${AUTH_API }/depots?userId=${userId}`);
  }

  getDepot(depotId: number): Observable<Depot> {
    return this.httpClient.get<Depot>(`${AUTH_API}/depot/${depotId}`);
  }

  updateDepot(inputData: object, depotId: number): Observable<any> {
    return this.httpClient.put(`${AUTH_API}/depot/${depotId}/edit`, inputData);
  }

  destroyDepot(depotId: number): Observable<any> {
    return this.httpClient.delete(`${AUTH_API}/depot/${depotId}/delete`);
  }

  checkDepotUsine(inputData: any): Observable<any> {
    return this.httpClient.post(`${AUTH_API}/checkDepotUsine`, inputData);
  }

  checkDepotrecycleur(inputData: any): Observable<any> {
    return this.httpClient.post(`${AUTH_API}/checkDepotrecycleur`, inputData);
  }

  checkDepotCollecteur(inputData: any): Observable<any> {
    return this.httpClient.post(`${AUTH_API}/checkDepotCollecteur`, inputData);
  }

  checkDepotConteneurTransformerrecycleur(inputData: any): Observable<any> {
    return this.httpClient.post(`${AUTH_API}/checkDepotConteneurTransformerrecycleur`, inputData);
  }

  checkDepot(inputData: any): Observable<any> {
    return this.httpClient.post(`${AUTH_API}/checkDepot`, inputData);
  }


  
  getDepotNameById(depotId: number) {
    return this.httpClient.get<{name: string}>(`${AUTH_API}/depots/${depotId}/name`);
  }
}
