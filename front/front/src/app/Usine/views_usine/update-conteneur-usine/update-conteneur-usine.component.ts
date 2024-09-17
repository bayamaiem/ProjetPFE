import { Conteneur } from '../models/conteneur';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { ButtonModule } from '@coreui/angular';
import { Dechet } from '../models/dechet';
import { Depot } from '../models/depot';
import { ConteneurService } from '../services/conteneur.service';
import { DechetsService } from '../services/dechets.service';
import { DepotService } from '../services/depot.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-update-conteneur-usine',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    RouterModule,
    RouterLink,
    FormsModule,
    RouterOutlet,
    RouterLinkActive,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  templateUrl: './update-conteneur-usine.component.html',
  styleUrl: './update-conteneur-usine.component.scss',
})
export class UpdateConteneurUsineComponent {
  ConteneurId: any;
  conteneurform: FormGroup;
  conteneur!: any;
  type: any;
  nom: any;
  dechets!: Dechet[];
  userId: any;

  depots!: Depot[];
  constructor(
    private conteneurService: ConteneurService,
    private dechetsService: DechetsService,
    private depotService: DepotService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService ,
    private router: Router
  ) {
    this.conteneurform = this.fb.group({
      id: [''],
      code: [''],
      prix: [''],
      dechet_id: [''],
      depot_id: [''],
    });
    this.dechets = [];
    this.depots = [];
  }
  ngOnInit(): void {
    this.conteneurform = this.fb.group({
      code: ['', Validators.required],
      prix: ['', Validators.required],
      dechet_id: ['', Validators.required],
      depot_id: ['', Validators.required],
    });
    this.getConteneur();
    this.getAlldechets();
    this.getAllDepots();
  }

  getConteneur() {
    this.ConteneurId = this.route.snapshot.paramMap.get('id');
    this.conteneurService.getConteneur(this.ConteneurId).subscribe(
      (res: any) => {
        console.log(res);
        if (res && res.conteneur) {
          this.conteneur = res.conteneur;
          // Update form values if conteneur is available
          this.conteneurform.patchValue({
            code: this.conteneur.code || '',
            prix: this.conteneur.prix || '',
            dechet_id: this.conteneur.dechet_id || '',
            depot_id: this.conteneur.depot_id || '',
          });
        } else {
          console.error(
            "Le service n'a pas renvoyé de conteneur valide :",
            res
          );
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération du conteneur :', error);
      }
    );
  }

  getAlldechets(): void {
    this.dechetsService.getDechets().subscribe((response) => {
      console.log('response', response.dechets);
      this.dechets = response.dechets;
    });
  }
  getAllDepots():  void {
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
    });}
  saveConteneur(): void {
    if (this.conteneurform.valid) {
      console.log('this.conteneurform.', this.conteneurform.value);
      const updatedConteneur: Conteneur = this.conteneurform.value;
      this.ConteneurId = this.route.snapshot.paramMap.get('id');

      this.conteneurService
        .updateConteneur(updatedConteneur, this.ConteneurId)
        .subscribe(
          (response: Conteneur) => {
            console.log('Conteneur mise à jour avec succès :', response);
            this.router.navigate(['/Usine/liste-conteneur']);
          },
          (error: any) => {
            console.error(
              'Erreur lors de la mise à jour de la conteneur:',
              error
            );
          }
        );
    }
  }
}
