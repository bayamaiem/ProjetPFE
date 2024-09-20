import { Dechet } from '../models/dechet';
import { DepotService } from '../services/depot.service';
import { Conteneur } from '../models/conteneur';
import { ConteneurService } from '../services/conteneur.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { DechetsService } from '../services/dechets.service';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from '@coreui/angular';
import { Depot } from '../models/depot';
import { Code } from '../models/code';

import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-create-conteneur',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    RouterModule,
    RouterLink,
    FormsModule,
    RouterOutlet,
    RouterLinkActive,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  templateUrl: './create-conteneur-usine.component.html',
  styleUrl: './create-conteneur-usine.component.scss',
})
export class CreateConteneurUsineComponent {
  conteneurForm: FormGroup;
  dechets: Dechet[] = [];
  depots: Depot[] = [];
  Codes :Code[]=[];
  errors: any = [];
  userId: any;
  constructor(
    private conteneurService: ConteneurService,
    private dechetsService: DechetsService,
    private depotService: DepotService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router :Router
  ) {
    this.conteneurForm = this.fb.group({
      code: [''],
      prix: ['', Validators.required],
      poids: ['', Validators.required],
      dechet_id: [''],
      depot_id: [''],
    });
    this.loadDechets();
    this.loadDepots();
    this.loadCodes();
  }

  loadDechets(): void {
    this.dechetsService.getDechets().subscribe({
      next: (res: any) => {
        console.log(res);
        this.dechets = res.dechets || [];
      },
      error: (err: any) => {
        console.log(err);
        this.errors = err.error.errors;
      },
    });
  }

  loadCodes(): void {
    this.dechetsService.getCodes().subscribe({
      next: (res: any) => {
        console.log(res);
        this.Codes = res.Codes|| [];
      },
      error: (err: any) => {
        console.log(err);
        this.errors = err.error.errors;
      },
    });
  }

  loadDepots(): void {
    const currentUser = this.authService.getUser(); // Supposons que cette méthode retourne l'utilisateur courant
    this.depotService.getDepots(currentUser.id).subscribe((res: any) => {
      console.log(res.depots);

      const user = this.authService.getUser();
      this.userId = user.userId;
      console.log('getUser', this.userId);
      this.depots = res.depots.filter((depot: any) => {
        console.log('rererere', depot.user.id);
        return depot.user.id === this.userId;
      });
    });}
  saveConteneur(): void {
    this.userId = this.authService.getUser();
    if (this.conteneurForm.valid) {
      const formData: Conteneur = this.conteneurForm.value;
      formData.user_id = this.userId.userId; // Add the user ID to the form data
      this.conteneurService.saveConteneur(formData).subscribe(
        (response: Conteneur) => {
          console.log('Conteneur créé avec succès :', response);
          this.conteneurForm.reset();
          this.router.navigate(['/Usine/liste-conteneur']);

        },
        (error: any) => {
          console.error('Erreur lors de la création du conteneur :', error);
        }
      );
    } else {
      this.conteneurForm.markAllAsTouched();
    }
  }
}
