import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Role } from './../../enums/Role';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  isSuccessfully = false;
  isRegisterFailed = false;
  errorMessage = '';
  isLoggedIn = false;
  alert: any;
  roles: { label: string; value: string }[] = [];

  signup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.roles = Object.keys(Role).map((key) => ({
      label: key,
      value: (Role as any)[key as keyof typeof Role],
    }));

    this.signup = this.fb.group({
      role: ['', [Validators.required]],
      username: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      certificat: ['', []],
      password_confirmation: [''],
      activite: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  get f() {
    return this.signup.controls;
  }

  onSubmit() {
    console.log('test', this.signup.value);
    this.authService.register(this.signup.value).subscribe({
      next: (res: any) => {
        console.log(res);
        this.authService.saveToken(res.token);
        this.authService.saveUser(res.user);
        this.isSuccessfully = true;
        this.alert = true;
        this.isRegisterFailed = false;
        this.router.navigate(['/login']);
      },
      error: (e: any) => {
        console.log(e);
        this.errorMessage = e.error.message;
        this.isRegisterFailed = true;
      },
    });
  }
  onRoleChange(event: Event) {
    const selectedRole = (event.target as HTMLSelectElement).value;
    console.log('Role changed to:', selectedRole);
    if (selectedRole === Role.Recycleur) {
      this.signup.get('certificat')?.setValidators([Validators.required]);
    } else {
      this.signup.get('certificat')?.clearValidators();
    }
    this.signup.get('certificat')?.updateValueAndValidity();

    if (selectedRole === Role.Usine) {
      this.signup.get('firstName')?.clearValidators();
      this.signup.get('lastName')?.clearValidators();
      this.signup.get('Type_dactivite')?.setValidators([Validators.required]);
    } else {
      this.signup.get('firstName')?.setValidators([Validators.required]);
      this.signup.get('lastName')?.setValidators([Validators.required]);
      this.signup.get('Type_dactivite')?.clearValidators();
    }
    this.signup.get('firstName')?.updateValueAndValidity();
    this.signup.get('lastName')?.updateValueAndValidity();
    this.signup.get('Type_dactivite')?.updateValueAndValidity();
  }
  closeAlert() {
    this.alert = false;
  }
}
