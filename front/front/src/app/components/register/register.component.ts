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
  emailExists: boolean = false; // Add this in your component class
  usernameExists : boolean = false; 
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
      Type_dactivite: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  get f() {
    return this.signup.controls;
  }

  onSubmit() {
    console.log('Form Data:', this.signup.value); // Vérifier les données du formulaire

    // Vérifier d'abord si l'email existe
    this.authService.checkEmail(this.signup.value.email).subscribe({
        next: (emailRes: any) => {
            this.emailExists = emailRes.exists; // Set emailExists

            // Now check for username existence
            this.authService.checkUsername(this.signup.value.username).subscribe({
                next: (usernameRes: any) => {
                    this.usernameExists = usernameRes.exists; // Set usernameExists

                    // Handle errors for both email and username
                    if (this.emailExists || this.usernameExists) {
                        this.errorMessage = this.emailExists 
                            ? "Cette adresse e-mail est déjà utilisée." 
                            : "Ce nom d'utilisateur est déjà utilisé, veuillez en choisir un autre.";
                        console.log(this.errorMessage);
                        return; // Stop further execution if either exists
                    }

                    // Proceed with registration if both checks are successful
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
                            console.log('Registration Error:', e);
                            this.errorMessage = e.error.message || 'Registration failed';
                            this.isRegisterFailed = true;
                        },
                    });
                },
                error: (e: any) => {
                    console.log('Username Check Error:', e);
                    this.errorMessage = e.error.message;
                    this.isRegisterFailed = true;
                }
            });
        },
        error: (e: any) => {
            console.log('Email Check Error:', e);
            this.errorMessage = e.error.message;
            this.isRegisterFailed = true;
        }
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
     
      this.signup.get('Type_dactivite')?.setValidators([Validators.required]);
    } else {
      
      this.signup.get('Type_dactivite')?.clearValidators();
    }
    
    this.signup.get('Type_dactivite')?.updateValueAndValidity();
  }
  closeAlert() {
    this.alert = false;
  }
}
