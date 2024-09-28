import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MouvementService } from './../services/mouvement.service';
import { MouvementResponse, MovementWrapper } from '../models/mouvement';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, CardModule, TableModule, GridModule, UtilitiesModule, ButtonDirective, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ThemeDirective, ButtonCloseDirective, ModalBodyComponent, TooltipDirective, ModalFooterComponent, ModalToggleDirective, PopoverDirective, WidgetStatAComponent, TemplateIdDirective, DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, WidgetStatBComponent, ProgressBarDirective, ProgressComponent, ProgressBarComponent } from '@coreui/angular';
import { NgTemplateOutlet } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { RouterLink, RouterOutlet } from '@angular/router';
import { WidgetComponent } from '../../widget/widget.component';
import { FormsModule } from '@angular/forms';
import { DechetsService } from 'src/app/Usine/views_usine/services/dechets.service';

@Component({
  selector: 'app-waste33',
  standalone: true,
  templateUrl: './waste.component.html',
  styleUrls: ['./waste.component.scss'],
  imports: [ CommonModule,
    FormsModule, 
    
    RowComponent,
    ColComponent,
    TextColorDirective,
    WidgetStatBComponent,
    ProgressBarDirective,
    ProgressComponent,
    ProgressBarComponent,
    RouterOutlet,
    IconDirective,CardComponent,WidgetComponent, CardHeaderComponent, CardBodyComponent, ChartjsComponent,GridModule, CardModule, TableModule, GridModule, UtilitiesModule,CardComponent, CardHeaderComponent, CardBodyComponent, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ThemeDirective, ButtonCloseDirective, ModalBodyComponent, ModalFooterComponent, ButtonDirective, NgTemplateOutlet, ModalToggleDirective, PopoverDirective, TooltipDirective,WidgetStatAComponent,TemplateIdDirective,IconDirective,DropdownComponent,DropdownToggleDirective,DropdownMenuDirective,DropdownItemDirective,RouterLink,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  
})
export class WasteComponent implements OnInit {
  mouvements: MovementWrapper[] = [];
  groupedMouvements: { count: number; data: MovementWrapper }[] = [];
  filteredMouvements: { count: number; data: MovementWrapper }[] = [];

  // Filters object to hold filter values
  filters = {
    conteneur_code: '',
    type: '',
    destinataire: '',
    dateDeSortie: '',
    nombreDeConteneur: '',
    poids:''
  };
  uniqueCodes: string[] = [];
  dechetTypes: string[] = [];
  uniqueDates: string[] = []; // Array to store unique dates
  uniquePoids: string[] = [];
  uniquecounts : string[] = [];

  constructor(private mouvementService: MouvementService ,  private dechetsService:DechetsService) {}

  ngOnInit(): void {
    this.getAllMouvements();
    this.  computeUniqueCodes() ;
    this.DechetsLists();
    this.  computeUniqueDates() ;
    this.computeUniqueDates();
  }
  getAllMouvements() {
    this.mouvementService.getGroupedMouvements().subscribe((res: any) => {
      this.groupedMouvements = res;
      console.log(this.groupedMouvements);
      console.log(res);
      this.filteredMouvements = res; // Initialize filteredMouvements with all data
      this.  computeUniqueCodes() ;
      this.  computeUniqueDates() ;
      this. computeUniquePoids();
      this.computeUniqueNumber();
    });
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
  applyFilters() {
    this.filteredMouvements = this.groupedMouvements.filter(item => {
      return (
        (!this.filters.conteneur_code || item.data.conteneur_code.toLowerCase().includes(this.filters.conteneur_code.toLowerCase())) &&
        (!this.filters.type || (item.data.conteneur_type || 'Unknown Type').toLowerCase().includes(this.filters.type.toLowerCase())) &&
        (!this.filters.destinataire || 
          (`le Collecteur ${item.data.movement.fournisseur2.firstName} ${item.data.movement.fournisseur2.lastName} située à ${item.data.movement.fournisseur2.address}`)
          .toLowerCase()
          .includes(this.filters.destinataire.toLowerCase())) &&
        (!this.filters.dateDeSortie || 
          (`en ${item.data.movement.date} à ${item.data.movement.hour}`)
          .toLowerCase()
          .includes(this.filters.dateDeSortie.toLowerCase())) &&
        (!this.filters.nombreDeConteneur || item.count.toString().includes(this.filters.nombreDeConteneur))&&
        (!this.filters.poids || item.data.poids.toString().includes(this.filters.poids))

      );
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

