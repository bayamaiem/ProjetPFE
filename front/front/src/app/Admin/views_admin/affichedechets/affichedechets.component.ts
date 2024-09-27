import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  RouterModule,
} from '@angular/router';
import { ButtonCloseDirective, ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, CardModule, ColComponent, DropdownComponent, DropdownItemDirective, DropdownMenuDirective, DropdownToggleDirective, GridModule, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, PopoverDirective, RowComponent, TableModule, TemplateIdDirective, TextColorDirective, ThemeDirective, TooltipDirective, UtilitiesModule, WidgetStatAComponent } from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';
import { WidgetComponent } from 'src/app/Usine/widget/widget.component';
import { DechetsService  } from '../services/dechets.service'; 
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dechet } from 'src/app/Usine/views_usine/models/dechet';

@Component({
  selector: 'app-affichedechets',
  standalone: true,
  imports: [ RowComponent,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterModule,
    IconDirective,
    WidgetComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ChartjsComponent,
    GridModule,
    CardModule,
    TableModule,
    GridModule,
    UtilitiesModule,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ThemeDirective,
    ButtonCloseDirective,
    ModalBodyComponent,
    ModalFooterComponent,
    ButtonDirective,
    NgTemplateOutlet,
    ModalToggleDirective,
    PopoverDirective,
    TooltipDirective,
    WidgetStatAComponent,
    TemplateIdDirective,
    RouterOutlet,
    WidgetComponent,
    IconDirective,
    DropdownComponent,
    DropdownToggleDirective,
    DropdownMenuDirective,
    DropdownItemDirective,
    RouterLink,],
  templateUrl: './affichedechets.component.html',
  styleUrl: './affichedechets.component.scss'
})
export class AffichedechetsComponent {
  dechets: any[] = []; // Store the fetched data
  editDechetForm: FormGroup; // Form group for editing a dechet
  selectedDechetId: number | null = null; // To store the ID of the dechet being edited
  disabledDechet: { [key: number]: boolean } = {};
  
  constructor(private dechetService: DechetsService , private fb: FormBuilder ) {
    this.editDechetForm = this.fb.group({
      type: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchDechets();
  }

/*  fetchDechets(): void {
    this.dechetService.getTypeDechets().subscribe(response => {
      if (response && response.dechets) {
          this.dechets = response.dechets; 
        console.log(response.dechets);
      }
     
    });
  }*/

  deleteDechet(dechetId: number) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Voulez-vous vraiment supprimer ce déchet ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dechetService.deleteDechet(dechetId).subscribe(
          response => {
            Swal.fire(
              'Supprimé!',
              'Le déchet a été supprimé avec succès.',
              'success'
            );
            this.fetchDechets(); // Refresh the list after deletion
          },
          error => {
            Swal.fire(
              'Erreur!',
              'Erreur lors de la suppression du déchet.',
              'error'
            );
          }
        );
      }
    });
  }
  
  openEditModal(dechet: any) {
    this.selectedDechetId = dechet.id;
    this.editDechetForm.patchValue({
      type: dechet.type,
    });

    Swal.fire({
      title: 'Modifier le déchet',
      html: `
        <input id="type" class="swal2-input" placeholder="Type" value="${dechet.type}">
      `,
      focusConfirm: false,
      showCancelButton: true,
        confirmButtonText: 'Oui, Modifier!',
      cancelButtonText: 'Annuler',
      preConfirm: () => {
        const type = (document.getElementById('type') as HTMLInputElement).value;
        if (!type) {
          Swal.showValidationMessage('Veuillez saisir un type de déchet');
          return false;
        }
        return { type };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.editDechetForm.patchValue({
          type: result.value?.type,
        });
        this.updateDechet(); // Call the update function
      }
    });
  }

  updateDechet() {
    if (this.selectedDechetId !== null && this.editDechetForm.valid) {
      this.dechetService.updateDechet(this.selectedDechetId, this.editDechetForm.value).subscribe(
        response => {
          Swal.fire('Succès', 'Déchet mis à jour avec succès', 'success');
          this.fetchDechets(); // Refresh the list after updating
        },
        error => {
          Swal.fire('Erreur', 'Erreur lors de la mise à jour du déchet', 'error');
        }
      );
    }
  }


  fetchDechets() {
    this.dechetService.getTypeDechets().subscribe(response => {
      if (response && response.dechets) {
        this.dechets = response.dechets; 
        console.log('Fetched dechets:', response.dechets);
        
        // Check each dechet to see if it exists in a container
        this.dechets.forEach((dechet: Dechet) => {
          this.checkIfDechetExistsInContainer(dechet);
          console.log('Processing dechet:', dechet);
        });
      }
    });
  }
  
// Assuming disabledDechet is declared as: disabledDechet: { [key: number]: boolean } = {};
checkIfDechetExistsInContainer(dechet: Dechet): void {
  const type = dechet.type;
  console.log(`Checking dechet type: ${type}`);
  
  this.dechetService.checkTypeUsine(type).subscribe(
    (response: any) => {
      console.log(`Response for dechet ${dechet.id}:`, response);
      
      // Update disabledDechet based on the response
      this.disabledDechet[dechet.id] = response.exists; 
    },
    (error: any) => {
      console.error('Erreur lors de la vérification du déchet dans un conteneur:', error);
    }
  );
}

 
}

