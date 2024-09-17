import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DepotService } from '../../../Usine/views_usine/services/depot.service';
import { Depot } from '../models/depot';
import { ButtonModule } from '@coreui/angular';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-depot-recycleur',
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
  templateUrl: './create-depot-recycleur.component.html',
  styleUrl: './create-depot-recycleur.component.scss',
})
export class CreateDepotRecycleurComponent implements OnInit {
  depotform: FormGroup;

  constructor(private depotService: DepotService, private fb: FormBuilder , private router:Router) {
    this.depotform = this.fb.group({
      nom: [''],
      lieu: [''],
    });
  }
  ngOnInit(): void {
    this.depotform = this.fb.group({
      nom: [null, Validators.required],
      lieu: [null, Validators.required],
    });
  }

  saveDepot(): void {
    if (this.depotform.valid) {
      const formData: Depot = this.depotform.value;
  
      // First, check if the depot already exists
      this.depotService.checkDepot(formData).subscribe(
        (checkResponse: { exists: boolean }) => {
          if (checkResponse.exists) {
            // Depot already exists
            alert('Cette dépot existe déjà.');
          } else {
            // Depot does not exist, proceed with saving
            this.depotService.saveDepot(formData).subscribe(
              (response: Depot) => {
                console.log('Depot créée avec succès :', response);
                this.depotform.reset();
                this.router.navigate(['/recycleur/liste-depots-recycleur']);
              },
              (error: any) => {
                console.error('Erreur lors de la création de la depot :', error);
              }
            );
          }
        },
        (error: any) => {
          console.error('Erreur lors de la vérification de la dépot :', error);
        }
      );
    } else {
      this.depotform.markAllAsTouched();
    }
  }
  
}
