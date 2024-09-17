import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DechetsService } from '../services/dechets.service';
import { ButtonModule } from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Dechet } from '../models/dechet';

@Component({
  selector: 'app-update-dechets',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonModule, RouterModule, HttpClientModule],
  templateUrl: './update-dechet.component.html',
  styleUrls: ['./update-dechet.component.scss']
})
export class UpdateDechetComponent  {
  dechetsId!: any;
  dechet: Dechet = {
    id: 0,
    type: '',
    created_at:new Date(),
    updated_at:new Date()
  }; // Initialize dechet to an empty object
  errors: any = [];

  constructor(private route: ActivatedRoute, private dechetsService: DechetsService) {}

  ngOnInit(): void {
    this.dechetsId = this.route.snapshot.paramMap.get('id');
    this.dechetsService.getDechet(this.dechetsId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.dechet = res.dechets || {}; // Ensure dechet is an object
      },
      error: (err: any) => {
        console.error('Error fetching dechet:', err);
        // Handle the error, e.g., display a message to the user
      }
    });
  }

  updateDechets(): void {
    const inputData = {
      type: this.dechet.type
    };

    this.dechetsService.updateDechet(inputData, this.dechetsId).subscribe({
      next: (res: any) => {
        console.log(res);
        alert(res.message);
      },
      error: (err: any) => {
        console.log(err);
        this.errors = err.error.errors;
      }
    });
  }
}
