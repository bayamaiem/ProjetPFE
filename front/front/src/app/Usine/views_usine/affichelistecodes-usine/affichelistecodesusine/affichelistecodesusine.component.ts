import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CodeService } from '../../services/code.service';
import { AuthService } from 'src/app/service/auth.service';
import { RouterLink, RouterLinkActive, RouterOutlet,RouterModule } from '@angular/router';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, CardModule, TableModule, GridModule, UtilitiesModule, ButtonDirective, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ThemeDirective, ButtonCloseDirective, ModalBodyComponent, TooltipDirective, ModalFooterComponent, ModalToggleDirective, PopoverDirective, WidgetStatAComponent, TemplateIdDirective, DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective } from '@coreui/angular';
import { Code } from '../../models/code';

@Component({
  selector: 'app-affichelistecodesusine',
  standalone: true,
  imports: [  CommonModule,RouterLink, RouterLinkActive, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, CardModule, TableModule, GridModule, UtilitiesModule, ButtonDirective, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ThemeDirective, ButtonCloseDirective, ModalBodyComponent, TooltipDirective, ModalFooterComponent, ModalToggleDirective, PopoverDirective, WidgetStatAComponent, TemplateIdDirective, DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, RouterOutlet,RouterModule],
  templateUrl: './affichelistecodesusine.component.html',
  styleUrl: './affichelistecodesusine.component.scss'
})
export class AffichelistecodesusineComponent {

  constructor(private codeService: CodeService ,private authService: AuthService ){}

  Codes: any; // Assurez-vous que Codes est de type Code[]
  userId?: Number;
  roleBasedDepot: any;
  roleee: string = '';
  disabledCodes: { [key: number]: boolean } = {}; // Object to track disabled state for each code

  ngOnInit() {
    this.CodesLists();
  }
  CodesLists() {
    const currentUser = this.authService.getUser(); // Assuming this method returns the current user
    this.codeService.getCodes(currentUser.id).subscribe(
      response => {
        console.log('Réponse API:', response);
  
        // Ensure that the response contains the 'Codes' property and it's an array
        if (response && response.Codes && Array.isArray(response.Codes)) {
          this.Codes = response.Codes; // Assign the array of codes to the property
          this.Codes.forEach((code: Code) => {
            this.checkIfCodeExistsInContainer(code.code); // Pass the code string
          });
        } else {
          console.error('La réponse n\'est pas un tableau de codes.');
        }
      },
      error => {
        console.error('Erreur lors du chargement des codes:', error);
      }
    );
  }
  deleteCode(event: any, code: any) {
    if (this.disabledCodes[code]) {
      alert('Impossible de supprimer ce code car il existe dans un conteneur.');
      return;
    }
  
    if (confirm('Êtes-vous sûr de vouloir supprimer ce code ?')) {
      event.target.innerText = "supprimer";
      this.codeService.deletCodes(code).subscribe((res: any) => {
        this.CodesLists();
        alert(res.message);
      });
    }
  }
  

  checkIfCodeExistsInContainer(code: any): void {
    this.codeService.checkCodeinContainer({ code: code }).subscribe(
      (response: any) => {
        console.log(`Checking code ${code}:`, response); // Debugging log
        if (response.exists) {
          this.disabledCodes[code] = true; // Disable the button for this code
        } else {
          this.disabledCodes[code] = false;
        }
      },
      (error: any) => {
        console.error('Erreur lors de la vérification du code dans un conteneur :', error);
      }
    );
  }
  
  

 /* deleteDepot(event:any,depotId: number) {
    if(confirm('Are your sure you want to delete this data ?'))
{
  event.target.innerText = "Deleting";
  this.codeService.destroyDepot(depotId).subscribe((res:any)=>{
this.DechetsLists();
alert(res.message);


});

    }
  }*/

    }