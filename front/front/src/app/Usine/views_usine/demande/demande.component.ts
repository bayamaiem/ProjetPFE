// src/app/demande/demande.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgStyle, NgTemplateOutlet } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DemandeService } from '../services/demande.service';
import { ConteneurService } from '../../../recycler/views_recycler/services/conteneur.service';
import { ModalService } from '../../../service/modal.service';
import { UsersService } from '../../../../app/service/users.service';
import { FilterByConteneurPipe } from '../../../pipes/filter-by-conteneur.pipe'; // Importer le pipe standalone

import {
  AvatarComponent,
  ButtonCloseDirective,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  CardModule,
  ColComponent,
  FormCheckLabelDirective,
  GridModule,
  GutterDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ModalToggleDirective,
  PopoverDirective,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TableModule,
  TextColorDirective,
  ThemeDirective,
  TooltipDirective,
  UtilitiesModule,
} from '@coreui/angular';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';

@Component({
  selector: 'app-demande',
  standalone: true,
  imports: [
    CommonModule,
    TextColorDirective,
    RouterLink,
    RouterLinkActive,
    ButtonDirective,
    CardComponent,
    CardBodyComponent,
    RowComponent,
    ColComponent,
    IconDirective,
    ReactiveFormsModule,
    ButtonGroupComponent,
    FormCheckLabelDirective,
    ChartjsComponent,
    NgStyle,
    FilterByConteneurPipe,
    CardFooterComponent,
    GutterDirective,
    ProgressBarDirective,
    ProgressComponent,
    CardHeaderComponent,
    TableDirective,
    AvatarComponent,
    CardModule,
    TableModule,
    GridModule,
    UtilitiesModule,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ThemeDirective,
    ButtonCloseDirective,
    ModalBodyComponent,
    ModalFooterComponent,
    NgTemplateOutlet,
    ModalToggleDirective,
    PopoverDirective,
    TooltipDirective,
    FilterByConteneurPipe // Importer le pipe standalone ici
  ],
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.scss'],
})
export class DemandeComponent implements OnInit {
  demandes: any[] = [];
  conteneurs: any[] = [];
  filteredDemandes: any[] = [];
  users: any[] = [];
  constructor(
    private demandeService: DemandeService,
    private modalService: ModalService,
    private conteneurService: ConteneurService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.getAllDemandes();
    this.ConteneursLists();
    this.getAllUsers();
  }
  getAllDemandes() {
    this.demandeService.getDemandes().subscribe((res) => {
      if (Array.isArray(res.demandes)) {
        this.demandes = res.demandes;
      } else {
        // Si `res.demandes` est un objet, le convertir en tableau
        this.demandes = Object.values(res.demandes);
      }
      console.log(this.demandes);
    });
  }
  

  ConteneursLists() {
    this.conteneurService.getConteneurs().subscribe((res: any) => {
      this.conteneurs = res.conteneurs;
    });
  }

  getAllUsers(): void {
    this.usersService.getAllUsers2().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }


  openStatusModal(id: number, etat: boolean, conteneurID: number, place: string): void {
    console.log('openStatusModal:', { id, etat, conteneurID,place });
    if (!conteneurID) {
      console.error('Le conteneur est indéfini ou ne possède pas d\'id');
      return;
    }
    this.modalService
      .openModal(
        'Confirmer le changement',
        'Êtes-vous sûr de vouloir modifier le statut de cette demande ?'
      )
      .then(() => this.changeDemandeStatus(id, etat, conteneurID, place))
      .catch(() => console.log('cancelled'));
  }

  changeDemandeStatus(id: number, etat: boolean, conteneurID: number, place: string) {
    etat = !etat;

    this.demandeService.updateDemandeEtat(id, etat).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (error) => {
        console.error('Error ', error);
      },
    });

    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().split(' ')[0].substring(0, 5);
    const conteneuriD = conteneurID;

    if (conteneurID) {
      this.addMovement({ date: currentDate, hour: currentTime, place: place }, conteneuriD);
      this.Est_venduUsine(conteneurID);

    } else {
      console.error('Le conteneur est indéfini ou ne possède pas d\'id');
      return;
    }
  }

  addMovement(body: { date: string, hour: string, place: string }, conteneurID: number) {
    this.conteneurService.addMovement(body, conteneurID).subscribe({
      next: (response) => {
        console.log('Mouvement créé avec succès:', response);
      },
      error: (error) => {
        console.error('Erreur lors de la création du mouvement:', error);
      }
    });
  }

  Est_venduUsine(conteneurID: number){
      this.conteneurService.  Est_venduUsine(conteneurID).subscribe({
        next: (response) => {
          console.log('  Est_venduCollecteur créé avec succès:', response);
        },
        error: (error) => {
          console.error('Erreur lors de la création du    Est_venduUsine:', error);
        }
      });
  
  }
}
