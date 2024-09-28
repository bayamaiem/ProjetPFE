import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Code } from '../../models/code';
import { CodeService } from '../../services/code.service';
import { DechetsService } from '../../services/dechets.service';
import { Dechet } from '../../models/dechet';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-createcodesusine',
  standalone: true,
  imports: [    ReactiveFormsModule, CommonModule, 
  ],
  templateUrl: './createcodesusine.component.html',
  styleUrl: './createcodesusine.component.scss'
})
export class CreatecodesusineComponent implements OnInit {
  Codeform: FormGroup;
  dechets: Dechet[] = [];
  errors: any = [];


  constructor(private codeService: CodeService, private fb: FormBuilder ,    private router: Router ,    private dechetsService: DechetsService,

  ) {
    this.Codeform = this.fb.group({
      code: [''],
      dechet_id:['']
     
    });
  }
  ngOnInit(): void {
    this.Codeform = this.fb.group({
      code: [null, Validators.required],
      dechet_id: [null, Validators.required], // Assurez-vous que dechet_id est défini correctement

    });
    this.loadDechets();

  }
  goBack(): void {
    this.router.navigate(['/Usine/Gerer-codes']);
  }
  
  checkAndSaveCode(): void {
    if (this.Codeform.valid) {
      const code = this.Codeform.value.code;

      this.codeService.checkCode({ code }).subscribe(
        (response: any) => {
          if (response.exists) {
            alert('Ce code existe déjà.');
          } else {
            this.saveCode();
          }
        },
        (error: any) => {
          console.error('Erreur lors de la vérification du code :', error);
        }
      );
    } else {
      this.Codeform.markAllAsTouched();
    }
  }


  saveCode(): void {
    if (this.Codeform.valid) {
      const formData: Code = this.Codeform.value;
      console.log('Données envoyées:', formData); // Vérifiez que dechet_id est bien présent ici
      
      this.codeService.saveCode(formData).subscribe(
        (response: Code) => {
          console.log('Code enregistré avec succès :', response);
          this.Codeform.reset();
          this.router.navigate(['/Usine/Gerer-codes']);
        },
        (error: any) => {
          console.error('Erreur lors de la création du code :', error);
        }
      );
    } else {
      this.Codeform.markAllAsTouched();
    }
  }
  
    loadDechets(): void {
    this.dechetsService.getDechets().subscribe({
      next: (res: any) => {
        console.log(res);
        this.dechets = res.dechets || [];
      },
      error: (err: any) => {
        console.log(err);
        this.errors = err.error.errors;
      },
    });
  }
}
