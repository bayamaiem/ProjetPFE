import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet,RouterModule, ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CodeService } from '../services/code.service';
import { Code } from '../models/code';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-code-usine-component',
  standalone: true,
  imports: [RouterLink,     HttpClientModule, CommonModule,RouterLinkActive, RouterOutlet,RouterModule,   FormsModule ],
  templateUrl: './update-code-usine-component.component.html',
  styleUrl: './update-code-usine-component.component.scss'
})
export class UpdateCodeUsineComponentComponent {
  code : Code= { 
    id :0,
    code: '' ,
    dechet_id:0,
    dechet: { id: 0, type: '' }, // Create an instance of Dechet here

    created_at: new Date(),
    updated_at: new Date(),
    user_id:0
    }; // This holds the actual code to update
  CodeId: any;
  Codeform: FormGroup;
  errors: any = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private codeService: CodeService
  ) {
    this.Codeform = this.fb.group({
      code: [''],
    });
  }

  ngOnInit(): void {
   this.getCode();
  }


   getCode(){
    this.CodeId = this.route.snapshot.paramMap.get('id');
    this.codeService.getCode(this.CodeId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.code = res.code || {}; 
        console.log('Assigned code:', this.code.code);
        const inputData = { code: this.code.code };

        this.codeService.checkCodeinContainer(inputData).subscribe(
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
                  this.router.navigate([`/usine/codes/${this.CodeId}/edit`]);
                // Mise à jour si l'utilisateur confirme
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                  // Rediriger uniquement si l'utilisateur clique sur "Annuler"
                  console.log("Navigation vers la page /Usine/Gerer-codes après annulation");
                  this.router.navigate(['/Usine/Gerer-codes']);
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
      
      
      },
      error: (err: any) => {
        console.error('Error fetching Code:', err);
      },
    });
   }
  
  
   updateCode(): void {
    const inputData = { code: this.code.code };
  
    // Check if the code exists in any container before updating
    this.codeService.checkCodeinContainer(inputData).subscribe(
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
              console.log("Navigation vers la page /Usine/Gerer-codes après annulation");
              this.router.navigate(['/Usine/Gerer-codes']);
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
  
  // Separate function to handle the actual update
  performUpdate(): void {

    const inputData = { code: this.code.code };

    this.codeService.checkCode(inputData).subscribe({
      next: (response: any) => {
        if (response.exists) {
          // Le code existe, afficher une alerte sans demande de confirmation
          Swal.fire({
            title: 'Attention!',
            text: 'Ce code existe déjà dans le système.',
            icon: 'warning',
            confirmButtonText: 'Ok'
          }).then(() => {
            // L'utilisateur a été informé, aucune mise à jour n'est effectuée
            console.log('Alerte affichée, mise à jour annulée car le code existe déjà.');
          });
        } else {
          // Le code n'existe pas, procéder directement à la mise à jour
          this.codeService.updateCode(inputData, this.CodeId).subscribe({
            next: (res: any) => {
              console.log('Code mis à jour avec succès:', res);
              this.router.navigate(['/Usine/Gerer-codes']); // Rediriger vers la gestion des codes
            },
            error: (err: any) => {
              console.error('Erreur lors de la mise à jour du code:', err);
              this.errors = err.error.errors;
            }
          });
        }
      },
      error: (err: any) => {
        console.error('Erreur lors de la vérification du code:', err);
      }
    });
  }
  
  
  
}