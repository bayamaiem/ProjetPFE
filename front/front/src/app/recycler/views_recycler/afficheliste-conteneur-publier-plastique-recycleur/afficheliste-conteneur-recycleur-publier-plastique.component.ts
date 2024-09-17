/*import { DechetsService } from '../services/dechets.service';*/
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
/*import { ConteneurService } from '../services/conteneur.service';
import { Conteneur } from '../models/conteneur';
import { DepotService } from '../services/depot.service';*/
import { ModalService } from '../../../service/modal.service';
import { UsersService } from 'src/app/service/users.service';
import { DemandeService } from '../../../service/demande.service';
import { ConteneurService } from '../services/conteneur.service';
import { catchError, throwError } from 'rxjs';
@Component({
  selector: 'app-afficheliste-conteneur-recycleur-publier-plastique',
  standalone: true,
  imports: [
    RowComponent,
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
  templateUrl: './afficheliste-conteneur-recycleur-publier-plastique.html',
  styleUrl: './afficheliste-conteneur-recycleur-publier-plastique.scss',
})
export class AffichelisteConteneurRecycleurPublierPlastiqueComponent{
  dechetType: string | null = null;
  conteneurs: any[] = []; // Initialize as an empty array
  public liveDemoVisible = false;
  user: any;
  userId: any;

  @ViewChild('customContent', { static: true })
  customContent!: TemplateRef<any>;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private conteneurService: ConteneurService,
    private modalService: ModalService,
    private demandeService: DemandeService
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.dechetType = 'plastique';

    
          this.ConteneursLists();
       
  }

  public ConteneursLists() {
    if (this.dechetType ) {
        this.conteneurService.getMovementsByType(this.dechetType).subscribe(
            (res: any) => {
                console.log('API Response:', res);
                if (res && res.movements) {
                    // Extract conteneur objects from the movements array
                    this.conteneurs = res.movements.map((movement: any) => movement.movement);
                    console.log('Filtered Conteneurs:', this.conteneurs);
                } else {
                    console.error('No movements found in the response:', res);
                }
            },
            (error) => {
                console.error('API Error:', error);
            }
        );
    } else {
        console.error('DechetType  is missing');
    }
}

  

  openDemandeModal(conteneur: any, conteneurID: number): void {
    this.modalService
      .openModal('Passer une demande', '', this.customContent)
      .then(() => {
        const currentDate = new Date();
        this.postDemande({ date: currentDate.toLocaleDateString() }, conteneurID);
      })
      .catch(() => console.log('Demande cancelled'));
  }

  postDemande(body: any, conteneurID: number): void {
    this.demandeService.postDemande(body, conteneurID).pipe(
      catchError((error) => {
        console.error('Une erreur s\'est produite', error);
        return throwError(error);
      })
    )
    .subscribe(
      (response) => {
        console.log('Post successful', response);
        window.location.reload();
      },
      (error) => {
        console.error('Post failed', error);
      }
    );
  }

  onDateChange(date: string) {
    console.log('Selected date:', date);
  }
}
