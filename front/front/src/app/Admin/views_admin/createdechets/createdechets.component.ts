import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { ButtonCloseDirective, ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, CardModule, ColComponent, DropdownComponent, DropdownItemDirective, DropdownMenuDirective, DropdownToggleDirective, GridModule, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, PopoverDirective, RowComponent, TableModule, TemplateIdDirective, TextColorDirective, ThemeDirective, TooltipDirective, UtilitiesModule, WidgetStatAComponent } from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';
import { WidgetComponent } from 'src/app/Usine/widget/widget.component';
import { DechetsService  } from '../services/dechets.service'; 

@Component({
  selector: 'app-createdechets',
  standalone: true,
  imports: [    ReactiveFormsModule ,RowComponent,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterModule,
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
  templateUrl: './createdechets.component.html',
  styleUrl: './createdechets.component.scss'
})
export class CreatedechetsComponent implements OnInit {

  dechetForm!: FormGroup;

  constructor(private fb: FormBuilder, private dechetsService: DechetsService , private router:Router) {} // Inject DechetsService

  ngOnInit(): void {
    this.dechetForm = this.fb.group({
      type: [''],
    });
  }

  onSubmit() {
    console.log(this.dechetForm.value);
    this.dechetsService.AjouterDechets(this.dechetForm.value).subscribe(
      response => {
        console.log('Déchet ajouté avec succès', response);
        this.router.navigate(['/AfficherListedetypedechets']);

      },
      error => {
        console.error('Erreur lors de l\'ajout du déchet', error);
      }
    );
  }


}
