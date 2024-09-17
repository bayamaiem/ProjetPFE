import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Code } from '../../models/code';
import { CodeService } from '../../services/code.service';

@Component({
  selector: 'app-createcodesusine',
  standalone: true,
  imports: [    ReactiveFormsModule
  ],
  templateUrl: './createcodesusine.component.html',
  styleUrl: './createcodesusine.component.scss'
})
export class CreatecodesusineComponent implements OnInit {
  Codeform: FormGroup;

  constructor(private codeService: CodeService, private fb: FormBuilder ,    private router: Router
  ) {
    this.Codeform = this.fb.group({
      code: [''],
     
    });
  }
  ngOnInit(): void {
    this.Codeform = this.fb.group({
      code: [null, Validators.required],
    });
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
      this.codeService.saveCode(formData).subscribe(
        (response: Code) => {
          console.log('depot créée avec succés :', response);
          this.Codeform.reset();
          this.router.navigate(['/Usine/Gerer-codes']);

        },
        (error: any) => {
          console.error('Erreur lors de la création de la depot :', error);
        }
      );
    } else {
      this.Codeform.markAllAsTouched();
    }
  }
}
