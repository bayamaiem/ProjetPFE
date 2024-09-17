import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DechetsService } from '../services/dechets.service';
import { Dechet } from '../models/dechet';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { ButtonModule } from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-create-dechets',
  standalone: true,
  imports:  [CommonModule, FormsModule,ReactiveFormsModule,ButtonModule, RouterModule, RouterLink, FormsModule,RouterOutlet,RouterLinkActive,CommonModule, ReactiveFormsModule,HttpClientModule ],

  templateUrl: './create-dechets.component.html',
  styleUrl: './create-dechets.component.scss'
})
export class CreateDechetsComponent implements OnInit {
   dechetsform: FormGroup;    
    constructor( private fb:FormBuilder,private dechetsService: DechetsService ) { 
  
      this.dechetsform = this.fb.group({
        type: [''],
       
      });}
    ngOnInit(): void {
      this.dechetsform = this.fb.group({
      type: [null, Validators.required],
       
        
      });
     
    }
  
  
  
    saveDechets():void {
      if(this. dechetsform.valid){
        const formData:Dechet=this.dechetsform.value;
        this.dechetsService.saveDechets(formData).subscribe(
          (response:Dechet )=>{
            console.log('dechet créée avec succés :',response);
            this.dechetsform.reset();
          }, (error: any) => {
            console.error('Erreur lors de la création de la dechet :', error);
          }
        );
      } else {
        this.dechetsform.markAllAsTouched();
      }
        
  
  
    
  }
  
  }






