import { RouterLink, RouterLinkActive, RouterOutlet, RouterModule } from '@angular/router';
import { Dechet } from '../models/dechet';
import { DechetsService } from '../services/dechets.service';
import { Component } from '@angular/core';
import { ChartData } from 'chart.js';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, CardModule, TableModule, GridModule, UtilitiesModule, ButtonDirective, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ThemeDirective, ButtonCloseDirective, ModalBodyComponent, TooltipDirective, ModalFooterComponent, ModalToggleDirective, PopoverDirective, WidgetStatAComponent, TemplateIdDirective, DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective } from '@coreui/angular';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { WidgetComponent } from '../../widget/widget.component';

@Component({
  selector: 'app-afficheliste-dechets',
  standalone: true,
  imports: [
    RowComponent, RouterLinkActive, CommonModule, IconDirective, WidgetComponent,
    ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent,
    ChartjsComponent, GridModule, RouterModule, CardModule, TableModule, UtilitiesModule,
    ModalComponent, ModalHeaderComponent, ModalTitleDirective, ThemeDirective,
    ButtonCloseDirective, ModalBodyComponent, ModalFooterComponent, ButtonDirective,
    NgTemplateOutlet, ModalToggleDirective, PopoverDirective, TooltipDirective,
    WidgetStatAComponent, TemplateIdDirective, RouterOutlet, DropdownComponent,
    DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, RouterLink
  ],
  templateUrl: './afficheliste-dechets.component.html',
  styleUrls: ['./afficheliste-dechets.component.scss']
})
export class AffichelisteDechetsComponent {
  dechets: Dechet[] = [];

  constructor(private dechetsService: DechetsService) {}

  ngOnInit() {
    this.DechetsLists();
  }

  DechetsLists() {
    this.dechetsService.getDechets().subscribe((res: any) => {
      console.log(res);
      this.dechets = res.dechets;
    });
  }

  deleteDechet(event:any,dechetId: number) {
    if(confirm('Are your sure you want to delete this data ?'))
{
  event.target.innerText = "Deleting";
  this.dechetsService.destroyDechet(dechetId).subscribe((res:any)=>{
this.DechetsLists();
alert(res.message);


});

    }
  }
}
