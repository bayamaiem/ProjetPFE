import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
/*import { DepotService } from '../services/depot.service';*/
import { ButtonModule } from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
/*import { Depot } from '../models/depot';*/
import { DepotService } from '../../../Usine/views_usine/services/depot.service';
import { Depot } from 'src/app/Usine/views_usine/models/depot';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-depot-collecteur',
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
  templateUrl: './update-depot-collecteur.component.html',
  styleUrl: './update-depot-collecteur.component.scss',
})
export class UpdateDepotCollecteurComponent {
  depotId!: any;
  depot: Depot = {
    id: 0,
    nom: '',
    lieu: '',
    user_id:0,
    created_at: new Date(),
    updated_at: new Date(),
  };
  errors: any = [];
  constructor(
    private depotService: DepotService,
    private route: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.depotId = this.route.snapshot.paramMap.get('id');
    
    if (this.depotId) {
      this.depotService.getDepot(this.depotId).subscribe({
        next: (res: any) => {
          console.log(res);
          this.depot = res.depots || {}; // Assurez-vous que le dépôt est un objet
  
          const inputData = {
            nom: this.depot.nom,
            lieu: this.depot.lieu,
          };          
  
          // Appel à checkDepotUsine pour vérifier si le dépôt existe
          this.depotService.checkDepotCollecteur(inputData).subscribe(
            (response: any) => {
              if (response.exists) {  // Condition pour l'existence du dépôt
                Swal.fire({
                  title: 'Attention!',
                  text: 'Le depot existe déjà dans un conteneur. Si vous modifiez ce code, il sera modifié dans tous les conteneurs.',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Modifier',
                  cancelButtonText: 'Annuler'
                }).then((result) => {
                  if (result.isConfirmed) {
                    // Correction de la navigation
                    this.router.navigate([`/usine/depots/${this.depotId}/edit`]);
                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                    console.log("Navigation vers la page Usine/liste-depots après annulation");
                    this.router.navigate(['/collecteur/liste-depots']);
                  }
                });
              } else {
                this.performUpdate();  // Si le dépôt n'existe pas, procéder à la mise à jour
              }
            },
            (error: any) => {
              console.error('Erreur lors de la vérification du depot :', error);
            }
          );
        },
        error: (err: any) => {
          console.error('Erreur lors de la récupération du dépôt :', err);
          // Gérer l'erreur
        }
      });
    } else {
      console.error('Depot ID non fourni');
      // Gérer l'erreur de l'ID manquant
    }
  }
    
  updateDepot() {
    const inputData = {
      nom: this.depot.nom,
      lieu: this.depot.lieu,

    };
    this.depotService.checkDepotUsine(inputData).subscribe(
      (response: any) => {
        if (response.exists) {
          Swal.fire({
            title: 'Attention!',
            text: 'Le code existe déjà dans un conteneur. Si vous modifiez ce code, il sera modifié dans tous les conteneurs.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Modifier',
            cancelButtonText: 'Annuler'
          }).then((result) => {
            if (result.isConfirmed) {
              this.performUpdate(); // Mise à jour si l'utilisateur confirme
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              // Rediriger uniquement si l'utilisateur clique sur "Annuler"
              console.log("Navigation vers la page /Usine/liste-depots après annulation");
              this.router.navigate(['/collecteur/liste-depots']);
            }
          });
        } else {
          // Si le code n'existe pas, procéder directement à la mise à jour
          this.performUpdate();
        }
      },
      (error: any) => {
        console.error('Erreur lors de la vérification du code :', error);
      }
    );
  }

  performUpdate(): void {
    const inputData = {
      nom: this.depot.nom,
      lieu: this.depot.lieu,

    };

    this.depotService.checkDepot(inputData).subscribe({
      next: (response: any) => {
        if (response.exists) {
          // Le dépôt existe, afficher une alerte pour informer l'utilisateur
          Swal.fire({
            title: 'Attention!',
            text: 'Ce dépôt existe déjà dans le système.',
            icon: 'warning',
            confirmButtonText: 'Ok'
          }).then(() => {
            // Après l'alerte, aucune action supplémentaire, mise à jour annulée
            console.log('Alerte affichée, mise à jour annulée car le dépôt existe déjà.');
          });
        } else {
          // Le dépôt n'existe pas, procéder directement à la mise à jour
          this.depotService.updateDepot(inputData, this.depotId).subscribe({
            next: (res: any) => {
              console.log('Dépôt mis à jour avec succès:', res);
              this.router.navigate(['/collecteur/liste-depots']);
            },
            error: (err: any) => {
              console.error('Erreur lors de la mise à jour du dépôt:', err);
              this.errors = err.error.errors;
            }
          });
        }
      },
      error: (err: any) => {
        console.error('Erreur lors de la vérification du dépôt:', err);
      }
    });
  }    
}
