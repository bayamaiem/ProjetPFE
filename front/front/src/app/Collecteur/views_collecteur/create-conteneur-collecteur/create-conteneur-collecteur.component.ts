/*import { Dechet } from '../models/dechet';
import { DepotService } from '../services/depot.service';
import { Conteneur } from '../models/conteneur';
import { ConteneurService } from '../services/conteneur.service';*/
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
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
/*import { DechetsService } from '../services/dechets.service';*/
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from '@coreui/angular';
/*import { Depot } from '../models/depot';*/
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-create-conteneur-collecteur',
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
  templateUrl: './create-conteneur-collecteur.component.html',
  styleUrl: './create-conteneur-collecteur.component.scss',
})
export class CreateConteneurCollecteurComponent {
/*  conteneurForm: FormGroup;
  dechets: Dechet[] = [];
  depots: Depot[] = [];
  errors: any = [];
  userId: any;
  constructor(
    private conteneurService: ConteneurService,
    private dechetsService: DechetsService,
    private depotService: DepotService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.conteneurForm = this.fb.group({
      code: ['', Validators.required],
      prix: ['', Validators.required],
      dechet_id: [''],
      depot_id: [''],
    });
    this.loadDechets();
    this.loadDepots();
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

  loadDepots(): void {
    this.depotService.getDepots().subscribe({
      next: (res: any) => {
        console.log(res);
        this.depots = res.depots || []; // Ensure depot is an object
      },
      error: (err: any) => {
        console.error('Error fetching depot:', err);
        // Handle the error, e.g., display a message to the user
      },
    });
  }
  saveConteneur(): void {
    this.userId = this.authService.getUser();
    if (this.conteneurForm.valid) {
      const formData: Conteneur = this.conteneurForm.value;
      formData.user_id = this.userId.userId; // Add the user ID to the form data
      this.conteneurService.saveConteneur(formData).subscribe(
        (response: Conteneur) => {
          console.log('Conteneur créé avec succès :', response);
          this.conteneurForm.reset();
        },
        (error: any) => {
          console.error('Erreur lors de la création du conteneur :', error);
        }
      );
    } else {
      this.conteneurForm.markAllAsTouched();
    }
  }*/
}
