import { Movement } from './../../../Usine/views_usine/models/mouvement';
import { AuthService } from '../../../service/auth.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { ConteneurdechetsaquisService } from '../../services/conteneurdechetsaquis.service';
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
import { ModalService } from '../../../service/modal.service';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { Depot, Fournisseur, GroupedMovement, MouvementResponse, MovementWrapper } from 'src/app/Usine/views_usine/models/mouvement';
import { map, switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import {FormBuilder, FormGroup, ReactiveFormsModule,FormsModule } from '@angular/forms';
import { DepotService } from 'src/app/Usine/views_usine/services/depot.service';
import { DemandeService } from 'src/app/recycler/views_recycler/services/demande.service';
import { MouvementResponse2 } from 'src/app/recycler/views_recycler/models/movement';

@Component({
  selector: 'app-afficheliste-conteneur-collecteur-acquis',
  standalone: true,
  imports: [
    ModalComponent,
    ReactiveFormsModule ,
    FormsModule ,
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
  templateUrl: './afficheliste-conteneur-collecteur.html',
  styleUrl: './afficheliste-conteneur-collecteur.scss',
})
export class AffichelisteConteneurCollecteurComponent implements OnInit {
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
  movements: any[] = []; // Make sure this matches the type of response
  DepotName: any;
  selectedConteneur: any = {};
  isModalOpen = false;
  depots: Depot[] = [];
  errors: any = [];
  userId: any;
  form: FormGroup;
  selectedMovement: any={};
  isProcessing = false; // Déclaration de la variable pour l'état du bouton
StockerConteneur: { [key: number]: boolean } = {};
filterForm: FormGroup;
  constructor(
    private conteneurdechetsaquisService: ConteneurdechetsaquisService,
    private authService: AuthService,
    private fb: FormBuilder,
    private modalService: ModalService,
    private depotService: DepotService,
    private demandeService:DemandeService


  ) {
    this.form = this.fb.group({
      depot_id: [''],
      prixcollecteur: ['']
    });

    this.filterForm = this.fb.group({
      code: [''],
      conteneur_type: [''],
      date: [''],
      fournisseur: ['']
    });
  }

  
  ngOnInit(): void {
    this.getAllMouvements();
    this.loadDepots();
    this. loadStockerConteneursFromStorage() ;

  }

  
  getAllMouvements(): void {
    this.conteneurdechetsaquisService.getMovementsByDemandeur().subscribe((response:  MouvementResponse)=> {
      if (response && response.movements) {
        this.movements = response.movements;
        console.log('Movements:', this.movements);
        this.groupAndCountMovements();
      } else {
        console.error('Unexpected response format:', response);
      }
    }, error => {
      console.error('Error fetching movements:', error);
    });
  }
  groupAndCountMovements(): void {
    const grouped: { 
      [key: string]: { 
        estStoker: any; 
        is_published: any; 
        conteneurPrix: any;
        movement: any[];  // Ensure movement is an array
        code: string; 
        id: number; 
        usine_name: string; 
        firstNameCollecteur: string; 
        lastNameCollecteur: string; 
        datecollecteur: string; 
        addresscollecteur: string; 
        hourcollecteur: string; 
        conteneur_type: string; 
        place: string; 
        date: string; 
        hour: string; 
        count: number; 
        fournisseur: Fournisseur; 
        depot: Depot; 
        depotId: number; 
        id_conteneur: number; 
        prixcollecteur: number; 
        conteneur_code: string;
        adressusine: string;
        fournisseurName: string;
        fournisseurlastName: string;
        fournisseuraddress: string;
        data: MovementWrapper[]; // Include data property
      } 
    } = {};
  
    this.movements.forEach(item => {
      const key = `${item.movement.conteneur.code}-${item.movement.IDfournisseur}-${item.conteneur_type}-${item.movement.date}-${item.movement.hour}`;
      
      if (!grouped[key]) {
        grouped[key] = {
          movement: [], 
          prixcollecteur: item.movement.prixcollecteur,
          code: item.movement.conteneur.code,
          id: item.movement.id,
          estStoker: item.movement.estStoker,
          is_published: item.movement.is_published,
          id_conteneur: item.movement.conteneur.id,
          conteneur_type: item.conteneur_type,
          conteneur_code: item.conteneur_code,
          place: item.movement.place,
          date: item.movement.date,
          hour: item.movement.hour,
          fournisseurlastName: item.fournisseurlastName,
          fournisseuraddress: item.fournisseuraddress,
          fournisseurName: item.fournisseurName,
          usine_name: item.usine_name,
          firstNameCollecteur: item.firstNameCollecteur,
          lastNameCollecteur: item.lastNameCollecteur,
          addresscollecteur: item.addresscollecteur,
          hourcollecteur: item.hourcollecteur,
          datecollecteur: item.datecollecteur,
          depotId: item.movement.newdepot ?? null,
          count: 0,
          adressusine: item.adressusine,
          conteneurPrix: item.movement.conteneurPrix,
          fournisseur: item.movement.fournisseur,
          depot: item.movement.depot,
          data: []  // Initialize data property
        };
      }
      grouped[key].movement.push(item);
      grouped[key].count++;
    });
  
    this.groupedMovements = Object.keys(grouped).map(key => {
      return {
        code: grouped[key].code,
        id: grouped[key].id,
        data: grouped[key].data,  // Ensure data property is included
        conteneurPrix: grouped[key].conteneurPrix,
        id_conteneur: grouped[key].id_conteneur,
        movement: grouped[key].movement,
        conteneur_code: grouped[key].conteneur_code,
        prixcollecteur: grouped[key].prixcollecteur,
        estStoker: grouped[key].estStoker,
        is_published: grouped[key].is_published,
        conteneur_type: grouped[key].conteneur_type,
        place: grouped[key].place,
        adressusine: grouped[key].adressusine,
        firstNameCollecteur: grouped[key].firstNameCollecteur,
        lastNameCollecteur: grouped[key].lastNameCollecteur,
        addresscollecteur: grouped[key].addresscollecteur,
        hourcollecteur: grouped[key].hourcollecteur,
        datecollecteur: grouped[key].datecollecteur,
        fournisseuraddress: grouped[key].fournisseuraddress,
        fournisseurName: grouped[key].fournisseurName,
        fournisseurlastName: grouped[key].fournisseurlastName,
        date: grouped[key].date,
        hour: grouped[key].hour,
        count: grouped[key].count,
        fournisseur: grouped[key].fournisseur,
        depot: grouped[key].depot,
        depotId: grouped[key].depotId ?? null,
        usine_name: grouped[key].usine_name || 'Unknown Usine',
      };
    });
  
    console.log('Grouped Movements:', this.groupedMovements);
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
  

  loadStockerConteneursFromStorage() {
    // Retrieve published conteneurs from localStorage
    const published = localStorage.getItem('StockerConteneur');
    if (published) {
      this.StockerConteneur = JSON.parse(published);
    }
  }
  adStockerConteneursFromStorage() {
    // Retrieve published conteneurs from localStorage
    const published = localStorage.getItem('StockerConteneur');
    if (published) {
      this.StockerConteneur = JSON.parse(published);
    }
  }

  saveStockerConteneursToStorage() {
    // Save the current state of published conteneurs to localStorage
    localStorage.setItem('StockerConteneur', JSON.stringify(this.StockerConteneur));
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
            conteneurId: item.movement.id,
            prixcollecteur:this.form.value.prixcollecteur
          });
          this.StockerConteneur[item.movement.id] = true;
        });
  
        // Save the stocker conteneurs to localStorage
        this.saveStockerConteneursToStorage();
      })
      .catch(() => {
        console.log('Operation cancelled');
        this.StockerConteneur[movement.id] = false;
        this.saveStockerConteneursToStorage();
      });
  }
  
  postStockerConteneur(body: any): void {
    console.log('Posting Stocker Conteneur:', body);
    console.log('Selected Conteneur ID:', body.conteneurId); // Debug log
  
    this.demandeService.postStockerConteneur(body.conteneurId, body).subscribe(
      (response) => {
        console.log('Post successful', response);
        this.StockerConteneur[body.conteneurId] = true;
        this.saveStockerConteneursToStorage();
      },
      (error) => {
        console.error('Post failed', error);
        this.StockerConteneur[body.conteneurId] = false;
        this.saveStockerConteneursToStorage();
      }
    );
  }
  filterMovements(): void {
    const filters = this.filterForm.value;
    this.groupedMovements = this.groupedMovements.filter(movement => {
      return (!filters.code || movement.code.includes(filters.code)) &&
             (!filters.conteneur_type || movement.conteneur_type === filters.conteneur_type) &&
             (!filters.date || movement.date === filters.date) &&
             (!filters.fournisseur || movement.fournisseur.firstName.includes(filters.fournisseur)||movement.fournisseur.lastName .includes(filters.fournisseur)
            ||movement.fournisseur.username.includes(filters.fournisseur)||movement.fournisseur.address.includes(filters.fournisseur));
    });
  }
}  