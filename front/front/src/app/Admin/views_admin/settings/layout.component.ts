import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import {
  RowComponent,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  FormControlDirective,
  FormDirective,
  FormLabelDirective,
  FormSelectDirective,
  FormCheckComponent,
  FormCheckInputDirective,
  FormCheckLabelDirective,
  ButtonDirective,
  ColDirective,
  InputGroupComponent,
  InputGroupTextDirective,
} from '@coreui/angular';
import { UsersService } from 'src/app/service/users.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    DocsExampleComponent,
    FormControlDirective,
    FormDirective,
    FormLabelDirective,
    FormSelectDirective,
    FormCheckComponent,
    FormCheckInputDirective,
    FormCheckLabelDirective,
    ButtonDirective,
    ColDirective,
    InputGroupComponent,
    InputGroupTextDirective,
  ],
})
export class LayoutComponent implements OnInit {
  userData: any = {};
  connectedUser?: any;
  profileForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getUserProfileData();
  }

  initializeForm(): void {
    this.profileForm = this.fb.group({
      username: [this.userData.userById?.username || '', Validators.required],
      firstName: [this.userData.userById?.firstName || '', Validators.required],
      lastName: [this.userData.userById?.lastName || '', Validators.required],
      email: [this.userData.userById?.email || '', [Validators.required, Validators.email]],
      role: [{ value: this.userData.userById?.role || '', disabled: true }, Validators.required],
      phone_number: [this.userData.userById?.phone_number || '', [Validators.required, Validators.maxLength(8)]],
    });
  }

  getUserProfileData(): void {
    this.connectedUser = this.authService.getUser();
    if (this.connectedUser) {
      this.userService.getUserById(this.connectedUser.userId).subscribe(
        (data) => {
          this.userData = data;
          this.initializeForm();
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const updatedData = this.profileForm.getRawValue();
      this.userService.updateUserProfile(this.connectedUser.userId, updatedData).subscribe(
        (response) => {
          this.successMessage = 'Profile updated successfully!';
          this.errorMessage = '';
          setTimeout(() => {
            this.successMessage = '';
          }, 1000); // Le message de succès disparaîtra après 3 secondes
          // Optionally reset the form or update it with new values
          this.initializeForm();
        },
        (error) => {
          this.errorMessage = 'Error updating profile. Please try again.';
          this.successMessage = '';
          setTimeout(() => {
            this.errorMessage = '';
          }, 1000); // Le message d'erreur disparaîtra après 3 secondes
        }
      );
    }
  }
}
