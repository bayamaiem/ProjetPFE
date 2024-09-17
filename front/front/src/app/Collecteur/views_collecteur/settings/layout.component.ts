import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
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
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    DocsExampleComponent,
    FormControlDirective,
    ReactiveFormsModule,
    FormsModule,
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
export class LayoutComponent {
  userData: any = {};
  connectedUser?: any;
  profileForm!: FormGroup;
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
      username: [this.userData.userById.username || ''],
      firstName: [this.userData.userById.firstName || ''],
      lastName: [this.userData.userById.lastName || ''],
      email: [this.userData.userById.email || ''],
      role: [{ value: this.userData.userById.role || '', disabled: true }],
      phone_number: [this.userData.userById.phone_number || ''],
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
      this.userService
        .updateUserProfile(this.connectedUser.userId, updatedData)
        .subscribe(
          (response) => {
            console.log('Profile updated successfully:', response);
            window.location.reload();
          },
          (error) => {
            console.error('Error updating profile:', error);
          }
        );
    }
  }
}
