import { Component } from '@angular/core';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { CommonModule } from '@angular/common';
import { MouvementService } from '../../../../Usine/views_usine/services/mouvement.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { NgTemplateOutlet } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ConteneurdechetsaquisService } from 'src/app/Collecteur/services/conteneurdechetsaquis.service';
import { Depot, Fournisseur, GroupedMovement, MovementWrapper} from '../../models/movement';
interface Movement {
  id: number;
  date: string;
  hour: string;
  place: string;
  conteneur_id: number;
  // Add other relevant fields here
}


@Component({
  selector: 'app-waste',
  standalone: true,
  templateUrl: './waste.component.html',
  styleUrls: ['./waste.component.scss'],
  imports: [
    RowComponent,
    CommonModule,
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
    IconDirective,
    DropdownComponent,
    DropdownToggleDirective,
    DropdownMenuDirective,
    DropdownItemDirective,
    RouterLink,
    FormsModule  // Add FormsModule here
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WasteComponent {

  
  mouvements: MovementWrapper[] = [];
  groupedMovements: GroupedMovement[] = [];
  filteredMouvements: {
addresscollecteur: any;
date: any;
hour: any;
hourcollecteur: any;
datecollecteur: any;
adressusine: any;
usine_name: any;
lastNameCollecteur: any;
conteneur_type: any;
conteneur_code: any; count: number; data: MovementWrapper[] 
}[] = [];
  movements: any[] = [];

  // Filters object to hold filter values
 

  // Filters object to hold filter values
  filters = {
    conteneur_code: '',
    type: '',
    usine: '',
    collecteur: '',
    dateEntree: '',
    dateAcquisition: '',
    nombreDeConteneur: ''
  };
  constructor(private mouvementService: MouvementService ,private conteneurdechetsaquisService: ConteneurdechetsaquisService,
  ) {}

  ngOnInit(): void {
    this.getAllMouvements();
    
    
  }

  getAllMouvements() {
    this.conteneurdechetsaquisService.getAllMovementsByDemandeurRecycleur().subscribe(
      (response: any) => {
        if (response && response.movements) {
          // Assign response data to component properties
          this.movements = response.movements;
          this.groupAndCountMovements();
          console.log('Grouped Movements:', this.movements);
         
          // Initialize filteredMouvements or other necessary processing
        } else {
          console.error('Unexpected response format:', response);
        }
      },
      error => {
        console.error('Error fetching movements:', error);
      }
    );
  }

  groupAndCountMovements(): void {
    const grouped: { [key: string]: {
      estStoker: any; is_published: any; movement: any[]; code: string; id: number;
      conteneur_type: string; place: string; date: string; hour: string; count: number;
      fournisseur: Fournisseur; depot: Depot; depotId: number; id_conteneur: number;
      prixcollecteur: number; usine_name: string; firstNameCollecteur: string; lastNameCollecteur: string;
      datecollecteur: string; conteneur_code: string; conteneurPrix: any; data: MovementWrapper[]; 
      addresscollecteur: string; hourcollecteur: string; adressusine:string;
    } } = {};
  
    this.movements.forEach(item => {
      const key = `${item.movement.conteneur_type}${item.movement.IDdemandeurrecycleur}${item.movement.date}${item.movement.hour}${item.movement.IDdemandeur}${item.movement.IDfournisseur}${item.movement.hourcollecteur}${item.movement.datecollecteur}`;
      if (!grouped[key]) {
        grouped[key] = {
          movement: [], 
          data: [],
          prixcollecteur: item.movement.prixcollecteur,
          is_published: item.movement.is_published, 
          code: item.movement.conteneur.code,
          id: item.movement.id,
          usine_name: item.Usine_name || 'Unknown Usine',  // Ensure usine_name is included
          estStoker: item.movement.estStoker,
          id_conteneur: item.movement.conteneur.id,
          firstNameCollecteur: item.firstNameCollecteur,
          lastNameCollecteur: item.lastNameCollecteur,
          addresscollecteur: item.addresscollecteur,
          adressusine: item.adressusine,
          hourcollecteur: item.hourcollecteur,
          datecollecteur: item.datecollecteur,
          hour: item.hour,
          date: item.date,
          conteneur_type: item.conteneur_type,
          conteneur_code: item.conteneur_code,
          place: item.movement.place,
          depotId: item.movement.newdepot ?? null,
          conteneurPrix: item.conteneurPrix,
          count: 0,
          fournisseur: item.movement.fournisseur,
          depot: item.movement.depot,
        };
      }
  
      grouped[key].movement.push(item);
      grouped[key].count++;
  
      if (item.movement.is_published === 1) {
        grouped[key].is_published = 1;
      }
    });
  
    this.groupedMovements = Object.keys(grouped).map(key => grouped[key]);
    this.filteredMouvements = [...this.groupedMovements];
    console.log('Grouped Movements:', this.groupedMovements);
  }
  
  filterMovements(): void {
    console.log('Filter Movements called');
    console.log('Current Filters:', this.filters);
    
    this.filteredMouvements = this.groupedMovements.filter((group) => {
      const matchesCode = group.conteneur_code.toLowerCase().includes(this.filters.conteneur_code.toLowerCase());
      const matchesType = group.conteneur_type.toLowerCase().includes(this.filters.type.toLowerCase());
      const matchesUsine = group.usine_name.toLowerCase().includes(this.filters.usine.toLowerCase());
      const matchesCollecteur = (
        group.firstNameCollecteur.toLowerCase() + ' ' + group.lastNameCollecteur.toLowerCase()
      ).includes(this.filters.collecteur.toLowerCase());
      const matchesDateEntree = !this.filters.dateEntree || group.datecollecteur === this.filters.dateEntree;
      const matchesDateAcquisition = !this.filters.dateAcquisition || group.date === this.filters.dateAcquisition;
      const matchesNombreDeConteneur = !this.filters.nombreDeConteneur || group.count === +this.filters.nombreDeConteneur;

      return matchesCode && matchesType && matchesUsine && matchesCollecteur && matchesDateEntree && matchesDateAcquisition && matchesNombreDeConteneur;
    });
    
    console.log('Filtered Movements:', this.filteredMouvements);
  }


 
}

