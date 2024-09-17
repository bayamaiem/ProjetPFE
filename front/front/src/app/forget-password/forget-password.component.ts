import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordResetService } from '../password-reset-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ BrowserModule,ReactiveFormsModule,CommonModule,   FormsModule], 
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  email: string = '';

  constructor(private passwordResetService: PasswordResetService) {}

  onSubmit() {
    this.passwordResetService.forgetPassword(this.email).subscribe(
      (response) => {
        if (response.success==true) {
          alert('Please check your mail to reset your password.');
        } else {
          alert('User not found!');
        }
      },
      (error) => {
        alert('An error occurred: ' + error.message);
      }
    );
  }
}