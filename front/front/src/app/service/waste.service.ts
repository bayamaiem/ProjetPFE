import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://127.0.0.1:8001/api';

@Injectable({
  providedIn: 'root',
})
export class WasteService {
  constructor(private http: HttpClient) {}

  getTransformedWaste(): Observable<any> {
    return this.http.get(`${AUTH_API}/conteneur/transformed`);
  }
}
