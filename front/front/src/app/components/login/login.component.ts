import { Component } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  login = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
  });

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  user = '1';
  alert: any;
  notActive?: boolean;
  emailNotFound = false;
  passwordIncorrect = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.authService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.authService.getUser().roles;
      localStorage.setItem('SeesionUser', this.user);
      this.router.navigate(['/']);
    }
  }

  get f() {
    return this.login.controls;
  }


  onSubmit() {
    const { email, password } = this.login.value;

    this.authService.checkEmail(email).subscribe({
      next: (response: any) => {
        if (!response.exists) {
          this.emailNotFound = true;
          this.isLoginFailed = true;
          this.errorMessage = "Aucun compte trouvé avec cette adresse email.";
        } else {
          this.emailNotFound = false;
          this.authService.checkPassword(email, password).subscribe({
            next: (response: any) => {
              if (!response.exists) {
                this.passwordIncorrect = true;
                this.isLoginFailed = true;
                this.errorMessage = "Mot de passe incorrect.";
              } else {
                this.passwordIncorrect = false;
                this.authService.login(email, password).subscribe({
                  next: (data: any) => {
                    if (!data.active) {
                      this.notActive = true;
                    } else {
                      console.log('data.role', data.role);
                      this.authService.saveToken(data.token);
                      this.authService.saveUserRole(data.role);
                      this.authService.saveUser(data);
                      this.authService.hasRole(data.role);
                      this.isLoggedIn = true;
                      this.isLoginFailed = false;
                      this.alert = true;
                      this.redirectUsersByRole(data.role);
                    }
                  },
                  error: (e: any) => {
                    this.errorMessage = e.error.message;
                    this.isLoginFailed = true;
                  },
                });
              }
            },
            error: (e: any) => {
              this.errorMessage = "Erreur lors de la vérification du mot de passe.";
              this.isLoginFailed = true;
            },
          });
        }
      },
      error: () => {
        this.errorMessage = "Erreur lors de la vérification de l'email.";
        this.isLoginFailed = true;
      },
    });
  }

  redirectUsersByRole(userRole: string) {
    const routes: { [key: string]: string } = {
      recycleur: 'recycler/views_recycler/wastes',
      collecteur: 'collecteur/wastes',
      usine: 'Usine/views_usine/waste/wastes',
      admin:'Admin/views_admin/wastes'
    };

    const defaultRoute = '/';

    this.router.navigate([routes[userRole] || defaultRoute]);
  }

  closeAlert() {
    this.alert = false;
  }
}
