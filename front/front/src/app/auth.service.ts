import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8001/api'; // Changez le port si nécessaire

  constructor(private http: HttpClient) {}

  login(credentials: {
    email: string;
    password: string;
  }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `${this.apiUrl}/login`,
      credentials
    );
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  getUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user`);
  }
  

  logout(): Observable<any> {
    window.sessionStorage.clear();
    return this.http.post(`${this.apiUrl}/logout`, {});
  }
}
