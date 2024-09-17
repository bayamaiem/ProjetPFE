import { Component } from '@angular/core';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, CardModule, TableModule, GridModule, UtilitiesModule, ButtonDirective, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ThemeDirective, ButtonCloseDirective, ModalBodyComponent, TooltipDirective, ModalFooterComponent, ModalToggleDirective, PopoverDirective, WidgetStatAComponent, TemplateIdDirective, DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, WidgetStatBComponent, ProgressBarDirective, ProgressComponent, ProgressBarComponent } from '@coreui/angular';
import { NgTemplateOutlet } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { RouterLink,RouterOutlet  } from '@angular/router';
import{WidgetComponent} from '../../../widget/widget.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@Component({
  selector: 'app-waste',
  standalone: true,
  templateUrl: './waste.component.html',
  styleUrls: ['./waste.component.scss'],
  imports: [
    RowComponent,
    ColComponent,
    TextColorDirective,
    WidgetStatBComponent,
    ProgressBarDirective,
    ProgressComponent,
    ProgressBarComponent,
    RouterOutlet,
    IconDirective,CardComponent,WidgetComponent, CardHeaderComponent, CardBodyComponent, ChartjsComponent,GridModule, CardModule, TableModule, GridModule, UtilitiesModule,CardComponent, CardHeaderComponent, CardBodyComponent, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ThemeDirective, ButtonCloseDirective, ModalBodyComponent, ModalFooterComponent, ButtonDirective, NgTemplateOutlet, ModalToggleDirective, PopoverDirective, TooltipDirective,WidgetStatAComponent,TemplateIdDirective,IconDirective,DropdownComponent,DropdownToggleDirective,DropdownMenuDirective,DropdownItemDirective,
    RouterLink,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  
})
export class WasteComponent2 {

}
