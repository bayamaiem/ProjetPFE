import { Conteneur } from './../../../Usine/views_usine/models/mouvement';
import { DechetsService } from '../services/dechets.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { AuthService } from '../../../../app/service/auth.service';
import { DepotService } from '../../../Usine/views_usine/services/depot.service';

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
} from '@coreui/angular';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ConteneurService } from '../services/conteneur.service';
import { ModalService } from '../../../service/modal.service';
import { Fournisseur, GroupedMovement2, MouvementResponse2, MovementWrapper } from '../models/movement';
import { ConteneurdechetsaquisService } from 'src/app/Collecteur/services/conteneurdechetsaquis.service';
/*import { ModalComponent } from 'src/app/components/modal/modal.component';*/
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule
import { DemandeService } from '../services/demande.service';
import { Depot } from 'src/app/Usine/views_usine/models/mouvement';
import { format } from 'date-fns'; // Ensure date-fns is imported

@Component({
  selector: 'app-afficheliste-conteneur-recycleur-acquis',
  standalone: true,
  imports: [
    RowComponent, PaginationComponent,PageItemDirective,
    PageLinkDirective,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
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
  templateUrl: './afficheliste-conteneur-recycleur-aquis.component.html',
  styleUrl: './afficheliste-conteneur-recycleur-aquis.component.scss',
})
export class AffichelisteConteneurRecycleurAcquisComponent implements OnInit {
  @ViewChild('stockerConteneurModal') stockerConteneurModal!: TemplateRef<any>;



  filters: {
    conteneur_code: string;
    type: string;
    usine: string;
    collecteur: string;
   depot:string;
   poids:string;
  } = {
    conteneur_code: '',
    type: '',
    usine: '',
    collecteur: '',
  depot:'', 
  poids:'',
  };
  getMovementsByDemandeur: {
    demandeurName: string;
    conteneurId: string;
    count: number;
    data: MovementWrapper[];
  }[] = [];
  filteredMouvements: GroupedMovement2[] = [];
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
  selectedMovement: any={};
  isProcessing: boolean = false;  // Pour contrôler l'état du bouton
  StockerConteneur: { [key: number]: boolean } = {};
  uniqueCodes: string[] = [];

  filterForm: FormGroup;
  currentPage: number = 2;
  itemsPerPage: number = 10;
  totalItems: number = 0;
 // The subset of data to display on the current page
 // Number of items per page
  totalPages: number = 0;  // Total number of pages
  totalPagesArray: number[] = [];  // Array to store page numbers

  paginatedMovements: GroupedMovement2[] = [];
  
  constructor(
    private conteneurdechetsaquisService: ConteneurdechetsaquisService,
    private authService: AuthService,
    private modalService: ModalService,
    private conteneurService: ConteneurService,
    private router: Router,
    private demandeService: DemandeService,
    private depotService: DepotService,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      depot_id: [''],
      prixcollecteur:[''],
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
    this.getAllMouvements(this. currentPage);
    this.loadDepots(); 
    this. paginateMovements();  
  }
  getAllMouvements(page: any ): void {
    this.conteneurdechetsaquisService.getMovementsByDemandeurRecycleur(page).subscribe(
      (response: MouvementResponse2) => {
        if (response && response.movements) {
          // Assign response data to component properties
          this.movements = response.movements;
          this.filteredMouvements =this.movements;
          this.currentPage = response.current_page;
          this.totalItems = response.total_items;
          this.totalPages = response.total_pages;
          this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  
          // Debugging: log the movements to the console
          console.log('Movements:', this.movements);
          console.log('filtred Movements:', this.filteredMouvements);

          // Group and count movements based on certain criteria
          this.groupAndCountMovements();
        } else {
          // Handle unexpected response format
          console.error('Unexpected response format:', response);
        }
      },
      error => {
        // Handle errors that occur during the HTTP request
        console.error('Error fetching movements:', error);
      }
    );
  }
  
  groupAndCountMovements(): void {
    const grouped: {
      [key: string]: {
        code: string;
        movement: any, // Initialize an array to store multiple movements
        id: number;
        id_conteneur:number;
        depot: Depot;
        conteneur_type: string;
        place: string;
        date: string;
        hour: string;
        count: number;
        fournisseur2: Fournisseur; // Ensure this is defined
        fournisseur_name: string;
        updated_at: string;
        depotId: number;
        estStoker: number; 
        is_transformed:number;
        poids:number;
conteneur_code:string;// Store the stocking status
      }
    } = {};
  
    this.movements.forEach(item => {
      const key = `${item.movement.id}`;
      const  mouvement = item.movement;

      if (!grouped[key]) {
        grouped[key] = {
          
          movement: [], // Initialize an array to store multiple movements
          estStoker: item.movement.estStoker,  // Handle the stocking status
          is_transformed:item.is_transformed,
           conteneur_code:item.conteneur_code,
          code: item.movement.conteneur.code,
          id :item.movement.id,
          id_conteneur: item.movement.conteneur.id,
          depot: item.depot, 
          conteneur_type: item.conteneur_type,
          place: item.movement.place,
          date: item.movement.date,
          hour: item.movement.hour,
          poids:item.poids,
          count: 0,
          fournisseur2: item.movement.fournisseur2, // Assign fournisseur2
          fournisseur_name: item.movement.fournisseur.username,
          updated_at: item.movement.updated_at,
          depotId: item.movement.newdepot ?? null,

        };
      }
      grouped[key].movement.push(item);  // Add the movement to the list

      grouped[key].count++;
    });
  
    this.groupedMovements = Object.keys(grouped).map(key => grouped[key]);
    this.filteredMouvements = [...this.groupedMovements];
    this.totalItems = this.groupedMovements.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.updateTotalPagesArray();
    this.paginateMovements();

  }
  filterMovements(): void {
    console.log('Filter Movements called');
    console.log('Current Filters:', this.filters);
    
    this.filteredMouvements = this.groupedMovements.filter((group) => {
      // Filter by conteneur_code
      const matchesCode = !this.filters.conteneur_code || group.conteneur_code?.toLowerCase().includes(this.filters.conteneur_code.toLowerCase());
  
      // Filter by conteneur_type
      const matchesType = !this.filters.type || group.conteneur_type?.toLowerCase().includes(this.filters.type.toLowerCase());
  
      // Filter by depot (using both nom and lieu)
      const matchesDepot = !this.filters.depot || (
        (group.depot?.nom + ' ' + group.depot?.lieu).toLowerCase().includes(this.filters.depot.toLowerCase())
      );
  
      // Filter by collecteur (fournisseur2)
      const matchesCollecteur = !this.filters.collecteur || (
        (group.fournisseur2?.firstName + ' ' + group.fournisseur2?.lastName).toLowerCase().includes(this.filters.collecteur.toLowerCase())
      );

      const matchesPoids = !this.filters.poids || (
        (group.poids + ' ' + group.poids).toLowerCase().includes(this.filters.collecteur.toLowerCase())
      );
      
      return matchesCode && matchesType && matchesDepot && matchesCollecteur;
    });
    
    console.log('Filtered Movements:', this.filteredMouvements);
  }
  
  
  
  updateTotalPagesArray(): void {
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  paginateMovements(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedMovements = this.groupedMovements.slice(startIndex, endIndex);
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


 
  openStockerConteneurModal(movement: any) {
    this.selectedMovement = movement;
    console.log('Selected Movement for Modal:', this.selectedMovement); // Debug log
  
    this.modalService.openModal('stocker conteneur', '', this.stockerConteneurModal)
      .then(() => {
        const currentDate = new Date();
        const date_stockage = `${currentDate.getFullYear()}-${('0' + (currentDate.getMonth() + 1)).slice(-2)}-${('0' + currentDate.getDate()).slice(-2)}`;
        
        // Loop through all conteneurs in the selected movement and post each one
        this.selectedMovement.movement.forEach((item: any) => {
          this.postStockerConteneur({
            newdepot: this.form.value.depot_id,
            date_stockage: date_stockage,
            conteneurId: item.movement.id
          });
        });
  
        // Save the stocker conteneurs to localStorage
      })
      .catch(() => {
        console.log('Operation cancelled');
      
      });
  }
  
  postStockerConteneur(body: any): void {
    console.log('Posting Stocker Conteneur:', body);
    console.log('Selected Conteneur ID:', body.conteneurId); // Debug log
  
    this.demandeService.postStockerConteneur(body.conteneurId, body).subscribe(
      (response) => {
        console.log('Post successful', response);
        
      },
      (error) => {
        console.error('Post failed', error);
       
      }
    );
  }

 

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages) {
      console.error('Invalid page number:', page);
      return;
    }
    this.currentPage = page;
    this.getAllMouvements(page);
  }
  
  getTotalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  
  
  openTransformModal(id_conteneur: Number): void {
    console.log('iddd', id_conteneur);
  
    // Activer l'état de traitement (désactiver le bouton "Transformer")
    localStorage.setItem('isProcessingTransformer', 'true');  // Sauvegarder l'état dans localStorage
  
    this.modalService
      .openModal(
        'Confirm Transformation',
        'Are you sure you want to transform this container'
      )
      .then(() => this.TransforConteneur(id_conteneur))
      .then(() => this.router.navigate(['/recycleur/liste-conteneur-acquis']))
      .catch(() => {
        console.log('cancelled');
        // En cas d'annulation, réinitialiser l'état si nécessaire
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
       
        localStorage.setItem('isProcessingTransformer', 'false');
      },
    });
  }
  computeUniqueCodes() {
    if (this.groupedMovements && this.groupedMovements.length > 0) {
      // Extract unique container codes from groupedMouvements
      const codes = this.groupedMovements.map(item => item.conteneur_code);
      this.uniqueCodes = [...new Set(codes)]; // Remove duplicates
      console.log(this.uniqueCodes); // Debug: Check the unique codes
    } else {
      this.uniqueCodes = [];
    }
  }
}  