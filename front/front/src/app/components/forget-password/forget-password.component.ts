import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../service/users.service';
import { CommonModule } from '@angular/common';
import { PasswordResetService } from '../../password-reset-service.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ,
    RouterModule ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  forgetPasswordForm: FormGroup;
  message: string | undefined;

  constructor(private fb: FormBuilder, private passwordResetService: PasswordResetService) {
    this.forgetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgetPasswordForm.valid) {
      this.passwordResetService.requestPasswordReset(this.forgetPasswordForm.value.email)
        .subscribe(response => {
          this.message = response.msg;
        }, error => {
          this.message = error.error.msg;
        });
    }
  }
}