import { DechetsService } from '../services/dechets.service';
import { RouterLink, RouterOutlet } from '@angular/router';
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
  PaginationComponent,
  PageItemDirective,
  PageLinkDirective,
  PaginationModule,
} from '@coreui/angular';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { WidgetComponent } from '../../widget/widget.component';
import { ConteneurService } from '../services/conteneur.service';
import { Conteneur } from '../models/conteneur';
import { DepotService } from '../services/depot.service';
import { ModalService } from '../../../service/modal.service';
import { ModalComponent } from 'src/app/components/modal/modal.component';
@Component({
  selector: 'app-afficheliste-conteneur-usine',
  standalone: true,
  imports: [
    ModalComponent,
    RowComponent,
    CommonModule,
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
    PaginationComponent,
    PageItemDirective,
    PageLinkDirective,
    PaginationModule,
  
  ],
  templateUrl: './afficheliste-conteneur-usine.html',
  styleUrl: './afficheliste-conteneur-usine.scss',
})
export class AffichelisteConteneurUsineComponent {
  constructor(
    private conteneurService: ConteneurService,
    private dechetsService: DechetsService,
    private depotservice: DepotService,
    private modalService: ModalService
  ) {}

  conteneurs: any;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;  // Total number of pages
  totalPagesArray: number[] = [];

  publishedConteneurs: { [key: number]: boolean } = {};

  ngOnInit() {
    this.ConteneursLists();
    this.loadPublishedConteneursFromStorage();

    
  }
  ListPagination(page: number): void {
    this.conteneurService.getConteneurs().subscribe((res: any) => {
      console.log('Response from API:', res);

      if (res && Array.isArray(res.conteneurs)) {
        this.conteneurs = res.conteneurs;
        this.totalItems = res.total_items || 0;
        this.itemsPerPage = res.itemsPerPage || 10;
        this.currentPage = res.current_page || 1;
        this.totalPages = res.total_pages || 0;

        // Update pagination array
        this.totalPagesArray = Array.from({ length: this.totalPages }, (_, index) => index + 1);
      } else {
        console.error('Invalid response structure:', res);
        this.conteneurs = [];
        this.totalItems = 0;
        this.totalPagesArray = [];
      }
    }, (error) => {
      console.error('Error fetching conteneurs:', error);
      this.conteneurs = [];
      this.totalItems = 0;
      this.totalPagesArray = [];
    });
  }  


  openDeleteModal(conteneurId: number): void {
    console.log(conteneurId)
    this.modalService
      .openModal(
       /*'Confirmer la suppression',*/
    'Êtes-vous sûr de vouloir supprimer ce conteneur ?'

      )
      .then(() => this.deleteConteneur(conteneurId))
      .catch(() => console.log('Deletion cancelled'));
  }

  ConteneursLists() {
    this.conteneurService.getConteneurs2().subscribe((res: any) => {
      console.log(res.conteneurs);
      this.conteneurs = res.conteneurs;
    });
  }

  loadPublishedConteneursFromStorage() {
    // Retrieve published conteneurs from localStorage
    const published = localStorage.getItem('publishedConteneurs');
    if (published) {
      this.publishedConteneurs = JSON.parse(published);
    }
  }
  adPublishedConteneursFromStorage() {
    // Retrieve published conteneurs from localStorage
    const published = localStorage.getItem('publishedConteneurs');
    if (published) {
      this.publishedConteneurs = JSON.parse(published);
    }
  }

  savePublishedConteneursToStorage() {
    // Save the current state of published conteneurs to localStorage
    localStorage.setItem('publishedConteneurs', JSON.stringify(this.publishedConteneurs));
  }

  publishConteneur(conteneur: any) {
    this.conteneurService.publishConteneur(conteneur.id).subscribe(
      (response: any) => {
        console.log(`Conteneur publié : ${conteneur.code}`);
        // Marquer ce conteneur comme publié
      
        // Afficher le message de confirmation
        this.modalService
          .openModal(` Veuillez noter que, une fois publié, il n'est pas possible de modifier ou d'annuler cette publication.`)
          .then(() => {console.log('Publication confirmée')
            this.publishedConteneurs[conteneur.id] = true;
            this.savePublishedConteneursToStorage(); // Sauvegarder dans localStorage
      
          })
          .catch(() => {
            console.log('Erreur lors de l\'affichage de la confirmation');
            // Annuler la publication en cas d'erreur
            this.publishedConteneurs[conteneur.id] = false;
            this.savePublishedConteneursToStorage(); // Sauvegarder le changement
          });
      },
      (error) => {
        console.error('Erreur lors de la publication du conteneur :', error);
      }
    );
  }
  
  
  

  deleteConteneur(conteneurId: number): void {
    this.conteneurService.destroyConteneur(conteneurId).subscribe({
      next: (response) => {
        console.log('Container deleted successfully', response);
        window.location.reload();
      },
      error: (error) => {
        console.error('Error deleting conteneur', error);
      },
    });
  }
  onPageChange(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.ListPagination(page);
    }
  }
  
  getTotalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
