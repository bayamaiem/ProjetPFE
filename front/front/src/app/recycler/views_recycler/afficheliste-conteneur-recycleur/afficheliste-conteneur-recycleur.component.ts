import { DechetsService } from './../services/dechets.service';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  Router,
} from '@angular/router';
import { Component } from '@angular/core';
import { ChartjsComponent } from '@coreui/angular-chartjs';
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
} from '@coreui/angular';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ConteneurService } from '../services/conteneur.service';
import { Conteneur } from '../models/conteneur';
import { DepotService } from '../services/depot.service';
import { ModalService } from '../../../service/modal.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ConteneurdechetsaquisService } from 'src/app/Collecteur/services/conteneurdechetsaquis.service';
import { AuthService } from 'src/app/auth.service';
import { format } from 'date-fns';
import { MouvementResponse2  ,Depot,GroupedMovement2 , MovementWrapper } from '../models/movement';
/*import { ModalComponent } from 'src/app/components/modal/modal.component';*/
@Component({
  selector: 'app-afficheliste-conteneur-recycleur',
  standalone: true,
  imports: [
    RowComponent,
    ReactiveFormsModule,
    CommonModule,
    IconDirective,
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
    IconDirective,
    DropdownComponent,
    DropdownToggleDirective,
    DropdownMenuDirective,
    DropdownItemDirective,
    RouterLink,
  ],
  templateUrl: './afficheliste-conteneur-recycleur.component.html',
  styleUrl: './afficheliste-conteneur-recycleur.component.scss',
})
export class AffichelisteConteneurRecycleurComponent {

 /* getMovementsByDemandeur: {
    demandeurName: string;
    conteneurId: string;
    count: number;
    data: MovementWrapper[];
  }[] = [];
  
  authenticatedUserId: number | undefined;
  mouvements: MovementWrapper[] = [];
  groupedMovements: GroupedMovement2[] = [];
  movements: any[] = [];
  DepotName: any;
  selectedConteneur: any = {};
  isModalOpen = false;
  depots: Depot[] = [];
  errors: any = [];
  userId: any;
  form: FormGroup;
  isProcessingTransformer: boolean = false;  // Pour contrôler l'état du bouton "Transformer"
  filterForm: FormGroup;

  constructor(
    private conteneurdechetsaquisService: ConteneurdechetsaquisService,
    private authService: AuthService,
    private modalService: ModalService,
    private conteneurService: ConteneurService,
    private router: Router,
    private depotService: DepotService,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      depot_id: ['']
    });

    {
      this.filterForm = this.fb.group({
        code: [''],
        conteneur_type: [''],
        date: [''],
        fournisseur: ['']
      });
    }
  }

  ngOnInit(): void {
    this.getAllMouvements();
    const storedProcessingStateTransformer = localStorage.getItem('isProcessingTransformer');
    this.isProcessingTransformer = storedProcessingStateTransformer === 'true';
  }

  getAllMouvements(): void {
    this.conteneurdechetsaquisService. getMovementsByDemandeurRecycleurnonTransformer().subscribe((response: MouvementResponse2) => {
      if (response && response.movements) {
        // Filtrer les mouvements avant de les utiliser
        this.movements = this.filterMovements(response.movements);
        console.log('Filtered Movements:', this.movements);
        this.groupAndCountMovements();
      } else {
        console.error('Unexpected response format:', response);
      }
    },
    error => {
      console.error('Error fetching movements:', error);
    }
  );
  }
  filterMovements(movements: any[]): any[] {
    return movements.filter(movementWrapper => {
      const movement = movementWrapper.movement;
      // Assurez-vous que les champs nécessaires ne sont pas null
      const hasValidDateStockage = movement.date_stockage !== null;
      const hasValidEstStoker = movement.estStoker !== null;
      const hasValidNewDepot = movement.newdepot !== null;
      
      // Optionnel : vous pouvez également filtrer sur d'autres critères
      return hasValidDateStockage && hasValidEstStoker && hasValidNewDepot;
    });
  }
  groupAndCountMovements(): void {
    const grouped: { [key: string]: any } = {
    };
  
    this.movements.forEach(item => {
        const key = `${item.movement.conteneur_id}-${item.movement.IDfournisseur}`;
        console.log('Raw Movements Data:', this.movements);

        if (!grouped[key]) {
            grouped[key] = {
                code: item.movement.conteneur.code,
                id :item.movement.id,
                id_conteneur: item.movement.conteneur.id,
                depot: item.depot, 
                firstNameCollecteur: item.firstNameCollecteur,
          lastNameCollecteur: item.lastNameCollecteur,
          addresscollecteur: item.addresscollecteur,
          adressusine: item.adressusine,
          hourcollecteur: item.hourcollecteur,
          datecollecteur: item.datecollecteur,
               conteneur_code:item.conteneur_code,
                conteneur_type: item.conteneur_type,
                place: item.movement.place,
                date: item.movement.date,
                hour: item.movement.hour,
                count: 0,
                fournisseur2: item.movement.fournisseur2,
                updated_at:item.movement.conteneur.updated_at,
                depotId: item.movement.newdepot ?? null,

            };
        }
        grouped[key].count++;
    });

    this.groupedMovements = Object.keys(grouped).map(key => {
      const updatedAtString = grouped[key].updated_at;
      const dateToFormat = updatedAtString ? new Date(updatedAtString) : new Date();
      const formattedDate = this.formatDate(dateToFormat); // Custom date formatting function
  
      return {
          code: grouped[key].code,
          id:grouped[key].id,
          id_conteneur: grouped[key].id_conteneur,
          depot: grouped[key].depot,
          conteneur_type: grouped[key].conteneur_type,
          place: grouped[key].place,
          movement: grouped[key].movement,          
          firstNameCollecteur: grouped[key].firstNameCollecteur,
          lastNameCollecteur: grouped[key].astNameCollecteur,
          addresscollecteur: grouped[key].addresscollecteur,
          adressusine: grouped[key].adressusine,
          hourcollecteur:grouped[key].hourcollecteur,
          datecollecteur: grouped[key].datecollecteur,
         conteneur_code:grouped[key].conteneur_code,
          date: grouped[key].date,
          hour: grouped[key].hour,
          count: grouped[key].count,
          fournisseur2: grouped[key].fournisseur2,
          updated_at: grouped[key].updated_at,
          formatted_updated_at: formattedDate,
          depotId: grouped[key].depotId ?? null,

      };
  });
  }  
  formatDate(date: Date): string {
    return date.toLocaleDateString(); // Formats the date as dd/MM/yyyy based on the user's locale
}

  
openTransformModal(id_conteneur: Number): void {
  console.log('iddd', id_conteneur);

  // Activer l'état de traitement (désactiver le bouton "Transformer")
  this.isProcessingTransformer = true;
  localStorage.setItem('isProcessingTransformer', 'true');  // Sauvegarder l'état dans localStorage

  this.modalService
    .openModal(
      'Confirm Transformation',
      'Are you sure you want to transform this container'
    )
    .then(() => this.TransforConteneur(id_conteneur))
    .then(() => this.router.navigate(['/recycleur/liste-conteneur-receycleur']))
    .catch(() => {
      console.log('cancelled');
      // En cas d'annulation, réinitialiser l'état si nécessaire
      this.isProcessingTransformer = false;
      localStorage.setItem('isProcessingTransformer', 'false');
    });
}

TransforConteneur(id_conteneur: Number) {
  this.conteneurService.transformContainer(id_conteneur).subscribe({
    next: (response) => {
      console.log('Transformation successful', response);
      // Optionnel : Si vous souhaitez que le bouton reste désactivé même après une transformation réussie, laissez l'état en 'true'
      window.location.reload();
    },
    error: (error) => {
      console.error('Error during transformation', error);
      // En cas d'erreur, réactiver le bouton
      this.isProcessingTransformer = false;
      localStorage.setItem('isProcessingTransformer', 'false');
    },
  });
}

resetTransformerButtonState(): void {
  // Réinitialiser l'état du bouton "Transformer" à l'état activé
  this.isProcessingTransformer = false;
  localStorage.setItem('isProcessingTransformer', 'false');
}

filterMovements2(): void {
  const filters = this.filterForm.value;
  this.groupedMovements = this.groupedMovements.filter(movement => {
    return (!filters.code || movement.code.includes(filters.code)) &&
           (!filters.conteneur_type || movement.conteneur_type === filters.conteneur_type) &&
           (!filters.date || movement.date === filters.date) &&
           (!filters.fournisseur || movement.fournisseur2.firstName.includes(filters.fournisseur)||movement.fournisseur2.lastName .includes(filters.fournisseur)
          ||movement.fournisseur2.username.includes(filters.fournisseur)||movement.fournisseur2.address.includes(filters.fournisseur));
  });
}*/
}