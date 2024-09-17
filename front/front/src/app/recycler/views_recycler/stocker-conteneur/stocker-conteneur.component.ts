import { Component, OnInit } from '@angular/core';
import {  FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { DepotService } from '../services/depot.service';
import { ButtonModule } from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Depot } from 'src/app/Usine/views_usine/models/depot';

@Component({
  selector: 'app-stocker-conteneur',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,ButtonModule, RouterModule, RouterLink, FormsModule,RouterOutlet,RouterLinkActive,CommonModule, ReactiveFormsModule,HttpClientModule],
  templateUrl: './stocker-conteneur.component.html',
  styleUrl: './stocker-conteneur.component.scss'
})
export class StockerConteneurComponent {
  depotId!: any;
  depot: Depot = {
    id: 0,
    nom: '',
    lieu: '',
    user_id:0,
    created_at: new Date(),
    updated_at: new Date(),
  };
  errors: any = [];
  constructor(
    private depotService: DepotService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.depotId = this.route.snapshot.paramMap.get('id');
    this.depotService.getDepot(this.depotId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.depot = res.depots || {}; // Ensure depot is an object
      },
      error: (err: any) => {
        console.error('Error fetching depot:', err);
        // Handle the error, e.g., display a message to the user
      },
    });
  }

  updateDepot() {
    const inputData = {
      nom: this.depot.nom,
    };

    this.depotService.updateDepot(inputData, this.depotId).subscribe({
      next: (res: any) => {
        console.log(res);
        alert(res.message);
      },
      error: (err: any) => {
        console.log(err);
        this.errors = err.error.errors;
      },
    });
  }
}
