import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://127.0.0.1:8001/api';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getAllUsers(token: string | null): Observable<any> {
    return this.http.get(`${AUTH_API}/users`);
  }
  getAllUsers2(): Observable<any> {
    return this.http.get(`${AUTH_API}/users`);
  }
  changeUserStatus(id: Number, activeStatus: boolean): Observable<any> {
    const body = {
      user_id: id,
      active: activeStatus,
    };
    return this.http.put(`${AUTH_API}/user/${id}/activate`, body);
  }

  getUsersByRole(role: string): Observable<any> {
    return this.http.get(`${AUTH_API}/users/by-role/${role}`);
  }

  getUserById(id: any): Observable<any> {
    return this.http.get(`${AUTH_API}/user/${id}`);
  }

  updateUserProfile(id: number, data: any): Observable<any> {
    return this.http.put(`${AUTH_API}/update-profile/${id}`, data);
  }

  forgetPassword(email: string): Observable<any> {
    const url = `${AUTH_API}/password/email`;
    return this.http.post(url, { email });
  }
}
