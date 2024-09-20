/*import { DechetsService } from '../services/dechets.service';*/
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Component, TemplateRef, ViewChild } from '@angular/core';
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
import { WidgetComponent } from '../../widget/widget.component';
/*import { ConteneurService } from '../services/conteneur.service';
import { Conteneur } from '../models/conteneur';
import { DepotService } from '../services/depot.service';*/
import { ModalService } from '../../../service/modal.service';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import {Movement, Depot, Fournisseur, GroupedMovement, MouvementResponse, MovementWrapper, Dechet } from 'src/app/Usine/views_usine/models/mouvement';
import { ConteneurdechetsaquisService } from '../../services/conteneurdechetsaquis.service';
import { AuthService } from '../../../service/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepotService } from 'src/app/Usine/views_usine/services/depot.service';
import { DemandeService } from 'src/app/recycler/views_recycler/services/demande.service';
import { ConteneurService } from '../../services/conteneur.service';
import { DechetsService } from 'src/app/Usine/views_usine/services/dechets.service';

@Component({
  selector: 'app-afficheliste-stock-conteneur-collecteur',
  standalone: true,
  imports: [  ReactiveFormsModule, FormsModule ,
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
  ],
  templateUrl: './afficheliste-stock-conteneur-collecteur.html',
  styleUrl: './afficheliste-stock-conteneur-collecteur.scss',
})
export class AffichelisteStockConteneurCollecteurComponent {
  @ViewChild('stockerConteneurModal') stockerConteneurModal!: TemplateRef<any>;

  getMovementsByDemandeur: {
    demandeurName: string;
    conteneurId: string;
    count: number;
    data: MovementWrapper[];
  
  
  }[] = [];
  authenticatedUserId: number | undefined;
  mouvements: MovementWrapper[] = []; // Utilisez un 'm' minuscule
  groupedMovements: GroupedMovement[] = [];
  movements: any[] = []; 
  filteredMouvements: GroupedMovement[] = [];
  movement:any; // Make sure this matches the type of response
  // Make sure this matches the type of response
  DepotName: any;
  selectedConteneur: any = {};
  uniquePrixCollecteur: string[] = [];

  userId:any;
  isModalOpen = false;
  depots: Depot[] = [];
  errors: any = [];
  form: FormGroup;
  depotId:any;
  selectedMovement: any={};

  publishedConteneurs: { [key: number]: boolean } = {};
 

  filters = {
    conteneur_code: '',
    type: '',
    destinataire: '',
    depot: '',
    conteneurPrix: '',
    prixcollecteur:  '',
    poids:''  // Add this line

  };
  uniqueConteneurPrix: string[] = []; // Liste des prix uniques
  dechets: Dechet[] = [];
  dechetTypes: string[] = [];
  uniqueDates: string[] = []; // Array to store unique dates
  uniqueCodes: string[] = [];
  uniqueDepot:string[]=[];
  constructor(
    private conteneurdechetsaquisService: ConteneurdechetsaquisService,
    private authService: AuthService,
    private fb: FormBuilder,
    private modalService: ModalService,
    private depotService: DepotService,
    private conteneurService:ConteneurService,
    private demandeService:DemandeService,
    private dechetsService:DechetsService


  ) {
    this.form = this.fb.group({
      depot_id: [''],
      prixcollecteur: [''],
    });
    
   
    
    
  }
  ngOnInit(): void {
    this.loadDepots();     
    this.getAllMouvements();
    this.getDepotNameById(this.depotId);
    this.loadPublishedConteneursFromStorage();
    this.DechetsLists();
    this.computeUniqueCodes();
    this.computeUniqueConteneurPrix();
   this. computeUniquePrixCollecteur();


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

 

  PublierConteneurMouvement(mouvement: any) {
    this.conteneurService.PublierConteneurMouvement(mouvement.id).subscribe(
      (response: any) => {
        console.log(`Conteneur publié : ${mouvement.code}`);
        // Mark as published
        this.publishedConteneurs[mouvement.id] = true;
        console.log('Published Conteneurs:', this.publishedConteneurs);
        this.savePublishedConteneursToStorage();
        this.modalService.openModal(
          'Publication Réussie',
          `Le conteneur ${mouvement.code} a été publié avec succès.`
        ).then(() => {
          console.log('Publication confirmée');
        }).catch(() => {
          console.log('Erreur lors de la confirmation');
          // Undo the publication in case of error
          this.publishedConteneurs[mouvement.id] = false;
          this.savePublishedConteneursToStorage();
        });
      },
      (error) => {
        console.error('Erreur lors de la publication du conteneur :', error);
      }
    );
  }
  
  
  
  getDepotNameById(depotId: number): string {
    const depot = this.depots.find(d => d.id === depotId);
    
    if (depot) {
        return depot.nom;
    } else {
        console.warn(`Depot with ID ${depotId} not found.`);
        return 'Depot Not Found';
    }
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
  
  getAllMouvements(): void {
    this.conteneurdechetsaquisService.getMovementsByDemandeur().subscribe((response:  any)=> {
      if (response && response.movements) {
        this.movements = response.movements;
        this. groupedMovements=response.movements;

        this.filteredMouvements=this. groupedMovements;

        console.log('Movements:', this.movements);
        console.log(   'liste filteredMouvements ' ,this.filteredMouvements );
        this.computeUniqueCodes();
        this.groupAndCountMovements();
        this.computeUniqueConteneurPrix();
        this. computeUniquePrixCollecteur();
      } else {
        console.error('Unexpected response format:', response);
      }
    }, error => {
      console.error('Error fetching movements:', error);
    });

  }
  groupAndCountMovements(): void {
    const grouped: { [key: string]: {
      estStoker: any; is_published: any; movement: any[]; code: string; id: number;
      conteneur_type: string; place: string; date: string; hour: string; count: number;
      fournisseur: Fournisseur; depot: Depot; depotId: number; id_conteneur: number;
      prixcollecteur: number;fournisseurName:string;poids:number; fournisseurlastName:string;fournisseuraddress:string; conteneur_code: string; conteneurPrix:any;data: MovementWrapper[];
    } } = {};
  
    this.movements.forEach(item => {
      const key = `${item.movement.conteneur_id}`;
      if (!grouped[key]) {
        grouped[key] = {
          movement: [], 
          data: [],

          // Initialize an array to store multiple movements
          prixcollecteur: item.movement.prixcollecteur,
          is_published: item.movement.is_published, // Initial value of is_published
          code: item.movement.conteneur.code,
          id: item.movement.id,
          fournisseurlastName:item.fournisseurlastName,
          fournisseuraddress:item.fournisseuraddress,
          fournisseurName:item.fournisseurName,
          poids:item.poids,
          estStoker: item.movement.estStoker,
          id_conteneur: item.movement.conteneur.id,
          conteneur_type: item.conteneur_type,
          conteneur_code: item.conteneur_code,
          place: item.movement.place,
          date: item.movement.date,
          hour: item.movement.hour,
          depotId: item.movement.newdepot ?? null,
          conteneurPrix: item.conteneurPrix, // Ajout de conteneurPrix ici

          count: 0,
          fournisseur: item.movement.fournisseur,
          depot: item.movement.depot, // Ensure depot is assigned here
        };
      }
  
      // Push the movement into the array and increment the count
      grouped[key].movement.push(item);
  
      // Increment the count of movements
      grouped[key].count++;
  
      // Determine the value of is_published based on a business rule
      // Example: set is_published to true if any of the movements in the group have is_published as 1
      if (item.movement.is_published === 1) {
        grouped[key].is_published = 1;
      }
    });

  
    // Convert the grouped object to an array
    this.groupedMovements = Object.keys(grouped).map(key => {
      return {
        code: grouped[key].code,
        id: grouped[key].id,
        data: [],

         conteneurPrix: grouped[key].conteneurPrix,
         fournisseuraddress:grouped[key].fournisseuraddress,
  fournisseurName:grouped[key].fournisseurName,
  fournisseurlastName:grouped[key]. fournisseurlastName,
        id_conteneur: grouped[key].id_conteneur,
        movement: grouped[key].movement,
        is_published: grouped[key].is_published, // Ensure the correct is_published value
        conteneur_code: grouped[key].conteneur_code,
        prixcollecteur: grouped[key].prixcollecteur,
        estStoker: grouped[key].estStoker,
        conteneur_type: grouped[key].conteneur_type,
        place: grouped[key].place,
        poids:grouped[key].poids,
        date: grouped[key].date,
        hour: grouped[key].hour,
        count: grouped[key].count,
        fournisseur: grouped[key].fournisseur,
        depot: grouped[key].depot,
        depotId: grouped[key].depotId ?? null,
      };
    });
    this.groupedMovements = Object.keys(grouped).map(key => grouped[key]);

  
    console.log('Grouped Movements:', this.groupedMovements);
  }
    
  
  
 
  

  openStockerConteneurModal(movement: any) {
    this.selectedMovement = movement;
    console.log('Selected Movement for Modal:', this.selectedMovement.movement); // Debug log
  
    // Open modal
    this.modalService.openModal('stocker conteneur', '', this.stockerConteneurModal)
      .then(() => {
        const currentDate = new Date();
        const date_stockage = `${currentDate.getFullYear()}-${('0' + (currentDate.getMonth() + 1)).slice(-2)}-${('0' + currentDate.getDate()).slice(-2)}`;
  const conteneurId= movement.id;
        // Debug logs to check form values and movement
        console.log('Depot ID from Form:', this.form.value.depot_id);
        console.log('Prix Collecteur from Form:', this.form.value.prixcollecteur);
        console.log('date_stockage:', date_stockage);
        console.log('id:', movement.id);

        
        // Ensure movement and form values are valid before proceeding
        const movementData = Array.isArray(this.selectedMovement.movement)
        ? this.selectedMovement.movement
        : [this.selectedMovement.movement]; // Ensure it's always an array
      
      movementData.forEach((movement: any) => {
        console.log('Posting Conteneur:', {
          newdepot: this.form.value.depot_id,
          date_stockage: date_stockage,
          conteneurId: movement.id,
          prixcollecteur: this.form.value.prixcollecteur
        });
        this.postStockerConteneur({
          newdepot: this.form.value.depot_id,
          date_stockage: date_stockage,
          conteneurId: movement.id,
          prixcollecteur: this.form.value.prixcollecteur
        });
      });
      
        
  
      })
      .catch(() => {
        console.log('Operation cancelled');
        console.log('id:', movement.id);
      
        console.log(movement);
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
  
  
  
  computeUniqueCodes(): void {

    const grouped: { [key: string]: {
      estStoker: any; is_published: any; movement: any[]; code: string; id: number;
      conteneur_type: string; place: string; date: string; hour: string; count: number;
      fournisseur: Fournisseur; depot: Depot; depotId: number; id_conteneur: number;
      prixcollecteur: number; poids:number ;conteneur_code: string; conteneurPrix:any; fournisseurName:string; fournisseurlastName:string;fournisseuraddress:string; data: MovementWrapper[]; // Change here to include data property

    } } = {};
  
    this.movements.forEach(item => {
      const key = `${item.movement.conteneur_id}`;
      if (!grouped[key]) {
        grouped[key] = {
          data: [],
          movement: [], // Initialize an array to store multiple movements
          prixcollecteur: item.movement.prixcollecteur,
          is_published: item.movement.is_published, // Initial value of is_published
          code: item.movement.conteneur.code,
          id: item.movement.id,
          estStoker: item.movement.estStoker,
          id_conteneur: item.movement.conteneur.id,
          conteneur_type: item.conteneur_type,
          conteneur_code: item.conteneur_code,
          place: item.movement.place,
          date: item.movement.date,
          hour: item.movement.hour,
          fournisseurlastName:item.fournisseurlastName,
          fournisseuraddress:item.fournisseuraddress,
          fournisseurName:item.fournisseurName,
          poids:item.poids,
          depotId: item.movement.newdepot ?? null,
          conteneurPrix: item.conteneurPrix, // Ajout de conteneurPrix ici

          count: 0,
          fournisseur: item.movement.fournisseur,
          depot: item.movement.depot, // Ensure depot is assigned here
        };
      }
  
      // Push the movement into the array and increment the count
      grouped[key].movement.push(item);
  
      // Increment the count of movements
      grouped[key].count++;
  
      // Determine the value of is_published based on a business rule
      // Example: set is_published to true if any of the movements in the group have is_published as 1
      if (item.movement.is_published === 1) {
        grouped[key].is_published = 1;
      }
    });

  
    // Convert the grouped object to an array
    this.groupedMovements = Object.keys(grouped).map(key => {
      return {
        code: grouped[key].code,
        id: grouped[key].id,
        data: [],

         conteneurPrix: grouped[key].conteneurPrix,
         fournisseuraddress:grouped[key].fournisseuraddress,
         fournisseurName:grouped[key].fournisseurName,
         fournisseurlastName:grouped[key]. fournisseurlastName,
        id_conteneur: grouped[key].id_conteneur,
        poids:grouped[key].poids,
        movement: grouped[key].movement,
        is_published: grouped[key].is_published, // Ensure the correct is_published value
        conteneur_code: grouped[key].conteneur_code,
        prixcollecteur: grouped[key].prixcollecteur,
        estStoker: grouped[key].estStoker,
        conteneur_type: grouped[key].conteneur_type,
        place: grouped[key].place,
        date: grouped[key].date,
        hour: grouped[key].hour,
        count: grouped[key].count,
        fournisseur: grouped[key].fournisseur,
        depot: grouped[key].depot,
        depotId: grouped[key].depotId ?? null,
      };
    });

    this.groupedMovements = Object.keys(grouped).map(key => grouped[key]);

    const uniqueCodeSet = new Set<string>();
  
  
    this.groupedMovements.forEach(item => {
      console.log('Propriétés de l\'élément:', item);
      console.log('Contenu de groupedMovements:', this.groupedMovements);

      const conteneurCode = item.conteneur_code?.trim();
      if (conteneurCode) {
        uniqueCodeSet.add(conteneurCode);
      }
    });
  
    this.uniqueCodes = Array.from(uniqueCodeSet);
    console.log('Codes de conteneurs uniques:', this.uniqueCodes);
  }
  
  computeUniqueConteneurPrix(): void {
    

    const prixSet = new Set<string>();

  
  
    this.groupedMovements.forEach(item => {
      console.log('Propriétés de l\'élément Prix:', item);
      const conteneurPrix = item.conteneurPrix
      ?.toString().trim(); // Convertir en string et nettoyer les espaces
      console.log('Conteneur Prix:', conteneurPrix);
      console.log('Grouped Movements:', this.groupedMovements);

      if (conteneurPrix) {
        prixSet.add(conteneurPrix);
      }
    });
    
  
    this.uniqueConteneurPrix = Array.from(prixSet);
    console.log('Prix de conteneurs uniques:', this.uniqueConteneurPrix);
  }
  


  computeUniquePrixCollecteur(): void {
    const prixSet = new Set<string>();

    this.groupedMovements.forEach(item => {
      const prixcollecteur = item.prixcollecteur?.toString().trim();
      if (prixcollecteur) {
        prixSet.add(prixcollecteur);
      }
    });

    this.uniquePrixCollecteur = Array.from(prixSet);
    console.log('Nouvelle Prix de conteneurs uniques:', this.uniqueConteneurPrix);

  }
  applyFilters() {
    this.filteredMouvements = this.groupedMovements.filter(movement => {
      const matchesCode = this.filters.conteneur_code
        ? movement.conteneur_code.toLowerCase().includes(this.filters.conteneur_code.toLowerCase())
        : true;
  
      const matchesType = this.filters.type
        ? movement.conteneur_type.toLowerCase().includes(this.filters.type.toLowerCase())
        : true;
  
      const matchesFournisseur = this.filters.destinataire
        ? `${movement.fournisseur.firstName.toLowerCase()} ${movement.fournisseur.lastName.toLowerCase()}`.includes(this.filters.destinataire.toLowerCase())
        : true;
  
      const matchesDepot = this.filters.depot
        ? (movement.depot ? movement.depot.nom.toLowerCase().includes(this.filters.depot.toLowerCase()) : false)
        : true;
  
      // Convert the filter value to a number before comparison
      const matchesConteneurPrix = this.filters.conteneurPrix
        ? movement.conteneurPrix === Number(this.filters.conteneurPrix) // Convert filter to number
        : true;
        const matchespoids = this.filters.poids
        ? movement.poids === Number(this.filters.poids) // Convert filter to number
        : true;
  
      const matchesPrixCollecteur = this.filters.prixcollecteur
        ? movement.prixcollecteur === Number(this.filters.prixcollecteur) // Convert filter to number
        : true;
  
      return (
        matchesCode &&
        matchesType &&
        matchesFournisseur &&
        matchesDepot &&
        matchesConteneurPrix &&
        matchesPrixCollecteur&&
        matchespoids
      );
    });

    console.log(   'liste filteredMouvements ' ,this.filteredMouvements );
  }
  

}  