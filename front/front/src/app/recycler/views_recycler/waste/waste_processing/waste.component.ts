import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { DechetsService } from '../../../../Usine/views_usine/services/dechets.service';

import {
  RowComponent,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  CardModule,
  TableModule,
  GridModule,
  UtilitiesModule,
  ButtonDirective,
  ModalComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ThemeDirective,
  ButtonCloseDirective,
  ModalBodyComponent,
  TooltipDirective,
  ModalFooterComponent,
  ModalToggleDirective,
  PopoverDirective,
  WidgetStatAComponent,
  TemplateIdDirective,
  DropdownComponent,
  DropdownToggleDirective,
  DropdownMenuDirective,
  DropdownItemDirective,
  WidgetStatBComponent,
  ProgressBarDirective,
  ProgressComponent,
  ProgressBarComponent,
} from '@coreui/angular';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WasteService } from '../../../../service/waste.service';
import { format } from 'date-fns'; // Import de date-fns
import { Depot } from '../../models/depot';
import { DepotService } from '../../../../Usine/views_usine/services/depot.service';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule
import { DemandeService } from '../../services/demande.service';
import { ModalService } from '../../../../service/modal.service';
import { AuthService } from '../../../../../app/service/auth.service';
import { Code } from '../../../../Usine/views_usine/models/code';

interface TransformedWaste {
  id: number;
  code: string;
  depot: {
    nom: string;
  };
  updated_at: string;
  formatted_updated_at?: string; // Propriété ajoutée pour la date et l'heure formatées
}
@Component({
  selector: 'app-waste',
  standalone: true,
  templateUrl: './waste.component.html',
  styleUrls: ['./waste.component.scss'],
  imports: [
    CommonModule,
    RowComponent,
    ColComponent,
    TextColorDirective,
    WidgetStatBComponent,
    ProgressBarDirective,
    ProgressComponent,
    ProgressBarComponent,
    RouterOutlet,
    IconDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ChartjsComponent,
    GridModule,
    CardModule,
    TableModule,
    GridModule,
    UtilitiesModule,
    CardComponent,
    CardHeaderComponent,
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
    TooltipDirective,
    WidgetStatAComponent,
    TemplateIdDirective,
    DropdownComponent,
    DropdownMenuDirective,
    DropdownItemDirective,
    RouterLink,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WasteComponent implements OnInit {
  @ViewChild('stockerConteneurModal') stockerConteneurModal!: TemplateRef<any>;

  transformedWaste: any[] = [];
  depots: Depot[] = [];
  form: FormGroup;
  userId: any;
  Codes :Code[]=[];
  selectedtransformed_containers: any={};
  errors: any = [];

  constructor(private wasteService: WasteService ,     private authService: AuthService,
       private demandeService: DemandeService,
    private modalService: ModalService,
      private fb: FormBuilder,    private depotService: DepotService ,private dechetsService: DechetsService,

  ) 
  {
    this.form = this.fb.group({
      depot_id: [''],
      coderecycleur:[''],
      date_realisation:['']
    });
  }
  ngOnInit(): void {
    this.wasteService.getTransformedWaste().subscribe(
      (res) => {
        console.log('API Response:', res);
        this.transformedWaste = res.transformed_containers.map((item: TransformedWaste) => {
          let formattedUpdatedAt = '';
  
          try {
            const date = new Date(item.updated_at);
            if (!isNaN(date.getTime())) {
              formattedUpdatedAt = format(date, 'yyyy-MM-dd');
            } else {
              console.warn('Invalid date:', item.updated_at);
            }
          } catch (error) {
            console.error('Date formatting error:', error);
          }
  
          return {
            ...item,
            formatted_updated_at: formattedUpdatedAt,
          };
        });
  
        console.log('Formatted Waste:', this.transformedWaste);
      },
      (error) => {
        console.error('Error fetching transformed waste:', error);
      }
    );
  
    this.loadDepots();
    this. loadCodes();   
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
  filterMovements(movements: any[]): any[] {
    return movements.filter(movementWrapper => {
      const movement = movementWrapper.movement;
      console.log(movement)
      // Assurez-vous que les champs nécessaires ne sont pas null
      const hasValidcoderecycleur = movement.date_stockage !== null;
      const hasValiddepotContTransformer	= movement.estStoker !== null;
      
      // Optionnel : vous pouvez également filtrer sur d'autres critères
      return hasValidcoderecycleur && hasValiddepotContTransformer	
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
    });
  }
  
  openStockerConteneurModal(transformed_containers: any) {
    // Ensure it's always treated as an array
    this.selectedtransformed_containers = Array.isArray(transformed_containers) 
      ? transformed_containers 
      : [transformed_containers];
  
    console.log('Selected Movement for Modal:', this.selectedtransformed_containers);
  
    this.modalService.openModal('stocker conteneur', '', this.stockerConteneurModal)
      .then(() => {
        console.log('Modal confirmed, proceeding with stocker conteneur');
        const currentDate = new Date();
        const date_stockage = `${currentDate.getFullYear()}-${('0' + (currentDate.getMonth() + 1)).slice(-2)}-${('0' + currentDate.getDate()).slice(-2)}`;
        
        this.selectedtransformed_containers.forEach((item: any) => {
          this.postStockerConteneurTransformer({
            depotContTransformer: this.form.value.depot_id,
            coderecycleur: this.form.value.coderecycleur,
            conteneurId: item.container.id
          });
        });
  
        // Optionally, save the stocker conteneurs to localStorage
      })
      .catch((reason) => {
        if (reason === 'cancel') {
          console.log('Operation cancelled by user');
        } else {
          console.error('Modal failed to open or another error occurred', reason);
        }
      });
  }
  
  postStockerConteneurTransformer(body: any): void {
    console.log('Posting Stocker Conteneur:', body);
    console.log('Selected Conteneur ID:', body.conteneurId); // Debug log
  
    this.demandeService.postStockerConteneurTransformer(body.conteneurId, body).subscribe(
      (response) => {
        console.log('Post successful', response);
        console.log(body)
      },
      (error) => {
        console.error('Post failed', error);
      }
    );
  }
  

  trackByIndex(index: number, item: any): any {
    return item.id;
  }

  getCodeByRecyclerId(coderecycleur: number): string {
    const codeObj = this.Codes.find(c => c.id === +coderecycleur); // Cast to number
    return codeObj ? codeObj.code : 'N/A';
  }
  
  
}
