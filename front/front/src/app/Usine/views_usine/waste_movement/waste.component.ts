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
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
    code: '',
    type: '',
    destinataire: '',
    dateDeSortie: '',
    nombreDeConteneur: ''
  };

  constructor(private mouvementService: MouvementService) {}

  ngOnInit(): void {
    this.getAllMouvements();
  }
  getAllMouvements() {
    this.mouvementService.getGroupedMouvements().subscribe((res: any) => {
      this.groupedMouvements = res;
      console.log(res);
      this.filteredMouvements = res; // Initialize filteredMouvements with all data
    });
  }

  applyFilters() {
    this.filteredMouvements = this.groupedMouvements.filter(item => {
      return (
        (!this.filters.code || item.data.movement.conteneur.code.toLowerCase().includes(this.filters.code.toLowerCase())) &&
        (!this.filters.type || (item.data.conteneur_type || 'Unknown Type').toLowerCase().includes(this.filters.type.toLowerCase())) &&
        (!this.filters.destinataire || 
          (`le Collecteur ${item.data.movement.fournisseur2.firstName} ${item.data.movement.fournisseur2.lastName} située à ${item.data.movement.fournisseur2.address}`)
          .toLowerCase()
          .includes(this.filters.destinataire.toLowerCase())) &&
        (!this.filters.dateDeSortie || 
          (`en ${item.data.movement.date} à ${item.data.movement.hour}`)
          .toLowerCase()
          .includes(this.filters.dateDeSortie.toLowerCase())) &&
        (!this.filters.nombreDeConteneur || item.count.toString().includes(this.filters.nombreDeConteneur))
      );
    });
  }
  
  
  
}

