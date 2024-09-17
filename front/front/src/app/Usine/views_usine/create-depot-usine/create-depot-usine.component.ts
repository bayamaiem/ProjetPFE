import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DepotService } from '../services/depot.service';
import { Depot } from '../models/depot';
import { ButtonModule } from '@coreui/angular';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-create-depot-usine',
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
  templateUrl: './create-depot-usine.component.html',
  styleUrl: './create-depot-usine.component.scss',
})
export class CreateDepotUsineComponent implements OnInit {
  depotform: FormGroup;

  constructor(private depotService: DepotService, private fb: FormBuilder ,    private router: Router
  ) {
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
                this.router.navigate(['/Usine/liste-depots']);
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
