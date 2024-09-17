import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {
  private apiUrl = 'http://127.0.0.1:8001/api'; 
  
  constructor (private http: HttpClient) { }

  // Envoyer une demande de réinitialisation de mot de passe
  requestPasswordReset(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/forget-password`, { email });
  }
  

  // Vérifier le token et obtenir les détails de l'utilisateur
  verifyResetToken(token: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/reset-password-load`);
  }

  // Réinitialiser le mot de passe
 
  forgetPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forget-password`, { email });
  }

  resetPasswordLoad(token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/reset-password?token=${token}`);
  }

  resetPassword(id: number, password: string, password_confirmation: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, {
      id,
     password,
     password_confirmation
    });
  }
 
  
}
