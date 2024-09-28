import { Component } from '@angular/core';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, CardModule, TableModule, GridModule, UtilitiesModule, ButtonDirective, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ThemeDirective, ButtonCloseDirective, ModalBodyComponent, TooltipDirective, ModalFooterComponent, ModalToggleDirective, PopoverDirective, WidgetStatAComponent, TemplateIdDirective, DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, WidgetStatBComponent, ProgressBarDirective, ProgressComponent, ProgressBarComponent } from '@coreui/angular';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { RouterLink,RouterOutlet  } from '@angular/router';
import{WidgetComponent} from '../../widget/widget.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MouvementService } from 'src/app/Usine/views_usine/services/mouvement.service';
import { MovementWrapper } from 'src/app/Usine/views_usine/models/mouvement';
import { ConteneurService } from '../../services/conteneur.service';
import { FormsModule } from '@angular/forms';
import { DechetsService } from 'src/app/Usine/views_usine/services/dechets.service';
import { Dechet } from 'src/app/Usine/views_usine/models/dechet';

@Component({
  selector: 'app-waste12',
  standalone: true,
  templateUrl: './waste.component.html',
  styleUrls: ['./waste.component.scss'],
  imports: [
    FormsModule,
    RowComponent,
    ColComponent,
    TextColorDirective,
    WidgetStatBComponent,
    ProgressBarDirective,
    ProgressComponent,
    ProgressBarComponent,
    RouterOutlet,
    CommonModule,
    IconDirective,CardComponent,WidgetComponent, CardHeaderComponent, CardBodyComponent, ChartjsComponent,GridModule, CardModule, TableModule, GridModule, UtilitiesModule,CardComponent, CardHeaderComponent, CardBodyComponent, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ThemeDirective, ButtonCloseDirective, ModalBodyComponent, ModalFooterComponent, ButtonDirective, NgTemplateOutlet, ModalToggleDirective, PopoverDirective, TooltipDirective,WidgetStatAComponent,TemplateIdDirective,IconDirective,DropdownComponent,DropdownToggleDirective,DropdownMenuDirective,DropdownItemDirective,RouterLink,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  
})
export class WasteComponent {
  mouvements: MovementWrapper[] = []; // Utilisez un 'm' minuscule
  groupedMouvements: { count: number; data: MovementWrapper  }[] = []; // Utilisez un tableau pour stocker les mouvements groupés
  filteredMouvements: { count: number; data: MovementWrapper }[] = [];
  filters = {
    conteneur_code
: '',
    type: '',
    destinataire: '',
    dateDeSortie: '',
    nombreDeConteneur: '',
    poids:'',
    movementType:  '' , // Add this line
    conteneurPrix:''

  };
  uniqueConteneurPrix: string[] = []; // Liste des prix uniques

  dechets: Dechet[] = [];
  dechetTypes: string[] = [];
  uniqueDates: string[] = []; // Array to store unique dates
  uniqueCodes: string[] = [];
  uniquePoids: string[] = [];
  uniquecounts : string[] = [];
  constructor(
    private conteneurService: ConteneurService, private dechetsService:DechetsService
  ) {}
 
  ngOnInit(): void {
    this.getAllMouvements();
    this.DechetsLists();
    this.computeUniqueDates();
    this.computeUniquePoids();
    this.computeUniqueConteneurPrix();
  }

  getAllMouvements() {
    this.conteneurService.getGroupedMouvements().subscribe((res: any) => {
      this.groupedMouvements = res;
      this.filteredMouvements = res;
      console.log(res);
      this.computeUniqueDates(); 
      this.computeUniqueCodes();// Initialize filteredMouvements with all data
      this.computeUniquePoids() ;
      this. computeUniqueNumber();
      this.computeUniqueConteneurPrix();
    });
  }

  computeUniqueCodes() {
    if (this.groupedMouvements && this.groupedMouvements.length > 0) {
      // Extract unique container codes from groupedMouvements
      const codes = this.groupedMouvements.map(item => item.data.conteneur_code);
      this.uniqueCodes = [...new Set(codes)]; // Remove duplicates
      console.log(this.uniqueCodes); // Debug: Check the unique codes
    } else {
      this.uniqueCodes = [];
    }
  }
  computeUniqueConteneurPrix(): void {
    

    const prixSet = new Set<string>();

  
  
    this.groupedMouvements.forEach(item => {
      console.log('Propriétés de l\'élément Prix:', item);
      const conteneurPrix =item.data.movement.conteneur.prix
      ?.toString().trim(); // Convertir en string et nettoyer les espaces
      console.log('Conteneur Prix:', conteneurPrix);
      console.log('Grouped Movements:', this.groupedMouvements);

      if (conteneurPrix) {
        prixSet.add(conteneurPrix);
      }
    });
    
  
    this.uniqueConteneurPrix = Array.from(prixSet);
    console.log('Prix de conteneurs uniques:', this.uniqueConteneurPrix);
  }
  computeUniqueDates() {
    if (this.groupedMouvements && this.groupedMouvements.length > 0) {
      // Extract unique dates from groupedMouvements
      const dates = this.groupedMouvements.map(item => `en ${item.data.movement.date} `);
      this.uniqueDates = [...new Set(dates)]; // Remove duplicates
      console.log(this.uniqueDates); // Debug: Check the unique dates
    } else {
      this.uniqueDates = [];
    }
  }
  computeUniquePoids() {
    if (this.groupedMouvements && this.groupedMouvements.length > 0) {
      // Extract unique weights from groupedMouvements
      const poids = this.groupedMouvements.map(item => item.data.poids?.toString().trim());
      this.uniquePoids = [...new Set(poids)]; // Remove duplicates
      console.log(this.uniquePoids); // Debug: Check the unique weights
    } else {
      this.uniquePoids = [];
    }
  }

  computeUniqueNumber() {
    if (this.groupedMouvements && this.groupedMouvements.length > 0) {
        // Extract unique counts from groupedMouvements
        const counts = this.groupedMouvements.map(item => item.count?.toString().trim());
        this.uniquecounts = [...new Set(counts)]; // Remove duplicates
        console.log(this.uniquecounts); // Debug: Check the unique counts
    } else {
        this.uniquecounts = [];
    }
}

  
  

  applyFilters() {
    this.filteredMouvements = this.groupedMouvements.filter(item => {
      // Check if the conteneur_code matches the filter
      const isMatchingCode = !this.filters.conteneur_code ||
        item.data.conteneur_code.toLowerCase().includes(this.filters.conteneur_code.toLowerCase());
  
      // Check if the conteneur_type matches the filter
      const isMatchingType = !this.filters.type ||
        (item.data.conteneur_type || 'Unknown Type').toLowerCase().includes(this.filters.type.toLowerCase());
  
      // Check if the destinataire matches the filter
      const isMatchingDestinataire = !this.filters.destinataire ||
        ((item.data.movement.IDdemandeurrecycleur === null
          ? `le fournisseur est l'usine ${item.data.movement.fournisseur.firstName} ${item.data.movement.fournisseur.lastName} située à ${item.data.movement.fournisseur.address}`
          : `le recycleur ${item.data.movement.demandeurrecycleur.firstName} ${item.data.movement.demandeurrecycleur.lastName} située à ${item.data.movement.demandeurrecycleur.address}`)
        .toLowerCase()
        .includes(this.filters.destinataire.toLowerCase()));

      // Check if the dateDeSortie matches the filter
      const isMatchingDateDeSortie = !this.filters.dateDeSortie ||
        (`en ${item.data.movement.date} à ${item.data.movement.hour}`)
        .toLowerCase()
        .includes(this.filters.dateDeSortie.toLowerCase());
  
      // Check if the nombreDeConteneur matches the filter
      const isMatchingNombreDeConteneur = !this.filters.nombreDeConteneur ||
        item.count.toString().includes(this.filters.nombreDeConteneur);
  
      // Check if the movement type matches the filter
      const isMatchingMovementType = !this.filters.movementType ||
        (this.filters.movementType === 'Sortie' && item.data.movement.IDdemandeurrecycleur !== null) ||
        (this.filters.movementType === 'Entrée' && item.data.movement.IDdemandeurrecycleur === null);
  
        const isMatchingPoids = !this.filters.conteneurPrix || 
    ( item.data.movement.conteneur.prix &&  item.data.movement.conteneur.prix.toString().includes(this.filters.conteneurPrix));
    const isMatchingPrix = !this.filters.poids || 
    (item.data.movement.conteneur.prix  && item.data.movement.conteneur.prix .toString().includes(this.filters.conteneurPrix));
  
      // Return true if all criteria match
      return isMatchingCode &&
        isMatchingType &&
        isMatchingDestinataire &&
        isMatchingDateDeSortie &&
        isMatchingNombreDeConteneur &&
        isMatchingPoids&&
       isMatchingPrix &&
        isMatchingMovementType;
    });
  }
  
  
  DechetsLists() {
    this.dechetsService.getDechets().subscribe((response: any) => {
      console.log('Réponse API complète:', response);  // Affiche la réponse complète pour le debug
      
      // Vérifie si la réponse contient un tableau de déchets
      if (response && Array.isArray(response.dechets)) {
        // Map pour obtenir uniquement les types
        this.dechetTypes = response.dechets.map((dechet: any) => dechet.type.trim());
      } else {
        console.error('La réponse de l\'API ne contient pas de tableau de déchets:', response);
        this.dechetTypes = [];
      }
    }, (error) => {
      console.error('Erreur lors de la récupération des types de déchets:', error);
    });
  }
  
  
}
