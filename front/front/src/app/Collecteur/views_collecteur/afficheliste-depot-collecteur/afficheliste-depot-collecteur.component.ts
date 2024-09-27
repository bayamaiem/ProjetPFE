import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  RouterModule,
} from '@angular/router';
/*import { DepotService } from '../services/depot.service';*/
import { Component } from '@angular/core';
import { ChartjsComponent } from '@coreui/angular-chartjs';
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
} from '@coreui/angular';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { WidgetComponent } from '../../widget/widget.component';
import { DepotService } from 'src/app/Usine/views_usine/services/depot.service';
import { AuthService } from 'src/app/service/auth.service';
import { Depot } from 'src/app/Usine/views_usine/models/depot';
/*import { Depot } from '../models/depot';*/

@Component({
  selector: 'app-afficheliste-depot-collecteur',
  standalone: true,
  imports: [
    RowComponent,
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
    RouterLink,
    FormsModule,
  ],
  templateUrl: './afficheliste-depot-collecteur.component.html',
  styleUrl: './afficheliste-depot-collecteur.component.scss',
})
export class AffichelisteDepotCollecteurComponent {
  constructor(
    private depotService: DepotService,
    private authService: AuthService
  ) {}

  /*depots: any;*/
  userId?: Number;
  roleBasedDepot: any;
  roleee: string = '';
  disabledDepots: { [key: number]: boolean } = {}; // Object to track disabled state for each code
  filteredDepots: Depot[] = [];
  filterText: string = ''; // New property for filtering
  depots: Depot[] = [];

  ngOnInit() {
    this.DePotLists();
  }
  DePotLists() {
    const currentUser = this.authService.getUser();
    this.depotService.getDepots(currentUser.id).subscribe((res: any) => {
      console.log(res.depots);

      const user = this.authService.getUser();
      this.userId = user.userId;
      console.log('getUser', this.userId);
      this.depots = res.depots.filter((depot: any) => {
        console.log('rererere', depot.user.id);
        return depot.user.id === this.userId;
      });
      this.filteredDepots = [...this.depots];


      // Check each depot to see if it exists in a container
      this.depots.forEach((depot: Depot) => {
        this.checkIfDepotExistsInContainer(depot);
        console.log(depot);
      });
    });
  }

  checkIfDepotExistsInContainer(depot: any): void {
    const nom = depot.nom;
    const lieu = depot.lieu;
    console.log(depot.nom);
    console.log(depot.lieu);
    this.depotService.checkDepotUsine({nom,lieu}).subscribe(
      (response: any) => {
        console.log(`Checking code ${depot.id}:`, response); // Debugging log

        this.disabledDepots[depot.id] = response.exists; // Disable the button for this depot

    },
      (error: any) => {
        console.error('Erreur lors de la vérification du dépôt dans un conteneur :', error);
      }
    );
  }

  deleteDepot(event: any, depotId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce dépôt ?')) {
      event.target.innerText = "Deleting";
      this.depotService.destroyDepot(depotId).subscribe((res: any) => {
        this.DePotLists(); // Refresh the list after deletion
        alert(res.message);
      });
    }
  }

   // Filter the list of depots based on the filterText
   applyFilter(): void {
    this.filteredDepots = this.depots.filter(depot =>
      depot.nom.toLowerCase().includes(this.filterText.toLowerCase()) ||
      depot.lieu.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }
}