import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordResetService } from '../password-reset-service.service';
import { ActivatedRoute, Router,RouterLink  } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports:[RouterLink ,
    ReactiveFormsModule,CommonModule,   FormsModule ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
  token: string = '';
  password: string = '';
  password_confirmation: string = '';
  userId: number = 0;

  constructor(private authService: AuthService, private passwordResetService: PasswordResetService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token')!;
    console.log('Token from URL:', this.token);
     // Vérifier le token récupéré

    this.passwordResetService.resetPasswordLoad(this.token).pipe(
      catchError((error) => {
        console.error('An error occurred:', error);
        return throwError(() => new Error('An error occurred while resetting the password.'));
      })
    ).subscribe(
      (response) => {
        if (response.success==true) {
          this.userId = response.user[0].id;
          console.log(this.userId);
        } else {
          alert('Invalid token or user not found.');
          this.router.navigate(['/']);
        }
      },
      (error) => {
        alert('An error occurred: ' + error.message);
        this.router.navigate(['/']);
      }
    );
  }     

  onSubmit() {
    if (this.password !== this.password_confirmation) {
      alert('Passwords do not match!');
      return;
    }
    
    this.passwordResetService.resetPassword(this.userId, this.password, this.password_confirmation).subscribe(
      () => { // Success callback
        alert('Your password has been reset successfully.');
        this.router.navigate(['/login']);
      },
      (error) => { // Error callback
        alert('An error occurred: ' + error.message);
        console.error('Reset password error:', error);
        console.error(this.userId, this.password, this.password_confirmation);

      }
    );
  }
  
}