import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthDataService } from './auth.model';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';
const AUTH_API = 'http://127.0.0.1:8001/api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private authData: AuthDataService) {}
  private userRoles: string[] = [];
  private userIdKey = 'userId';

  login(email: any, password: any): Observable<any> {
    return this.http.post(AUTH_API + '/login', {
      email,
      password,
    });
  }

// auth.service.ts
checkEmail(email: any): Observable<any> {
  return this.http.post<any>('http://127.0.0.1:8001/api/check-email', { email });
}
  

checkPassword(email: any, password: any): Observable<any> {
  return this.http.post<any>('http://127.0.0.1:8001/api/check-password', { email, password });
}

  register(body: any): Observable<any> {
    return this.http.post(AUTH_API + '/register', body);
  }
 getUserByName(username: string): Observable<any> {
    return this.http.get<any>(`${AUTH_API}/users/by-username/${username}`);
  }
  // Méthode pour vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    // Vérifiez si toutes les informations d'authentification nécessaires sont présentes
    return !!(
      this.authData.Token &&
      this.authData.UserID &&
      this.authData.Username &&
      this.authData.Role
    );
  }

  // Méthode pour récupérer les informations d'authentification stockées et vérifier l'expiration
  getAuthData(): any {
    const token = localStorage.getItem('Token');
    const userID = localStorage.getItem('UserID');
    const username = localStorage.getItem('Username');
    const role = localStorage.getItem('Role');
    const timestamp = localStorage.getItem('timestamp');

    if (token && userID && username && role && timestamp) {
      const expirationTime = 24 * 60 * 60 * 1000; // 1 jour en millisecondes
      const currentTime = Date.now();
      if (currentTime - parseInt(timestamp, 10) <= expirationTime) {
        return { token, userID, username, role };
      } else {
        this.clearAuthData();
        return null;
      }
    } else {
      return null;
    }
  }

  storeAuthenticatedUser(user: any) {
    localStorage.setItem('authenticatedUser', JSON.stringify(user));
  }

  // Method to get the authenticated user
  getAuthenticatedUser() {
    const user = localStorage.getItem('authenticatedUser');
    return user ? JSON.parse(user) : null;
  }

 

  // Méthode pour effacer les données d'authentification
  clearAuthData(): void {
    localStorage.removeItem('Token');
    localStorage.removeItem('UserID');
    localStorage.removeItem('Username');
    localStorage.removeItem('Role');
    localStorage.removeItem('timestamp');
  }

  isLoggedIn(): boolean {
    // Vérifier si le jeton d'authentification est présent dans le stockage local
    const token = sessionStorage.getItem('token');
    return !!token;
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }
  getUserID(): string | null {
    const userId = localStorage.getItem(this.userIdKey);
    console.log('Retrieved UserID from localStorage:', userId);
    return userId;
  }

  setUserID(userId: string): void {
    localStorage.setItem(this.userIdKey, userId);
  }
  getUsername(): string | null {
    return localStorage.getItem('Username');
  }

  getRole(): string | null {
    return sessionStorage.getItem('role');
  }

  getTimestamp(): string | null {
    return localStorage.getItem('timestamp');
  }

  hasRole(role: string): boolean {
    return this.userRoles.includes(role);
  }

  logout(): void {
    window.sessionStorage.clear();
  }
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public saveUserRole(role: string) {
    window.sessionStorage.removeItem('Role'),
      window.sessionStorage.setItem('Role', role);
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  includeAuthToken() {
    const token = localStorage.getItem('Token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + token,
      });
      return { headers };
    } else {
      return {};
    }
  }
}
