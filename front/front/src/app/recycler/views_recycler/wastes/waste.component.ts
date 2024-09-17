import { Component } from '@angular/core';
import{WidgetComponent} from '../../../widget/widget.component';
import {RouterOutlet  } from '@angular/router';
import { ColComponent, ProgressBarComponent, ProgressBarDirective, ProgressComponent, RowComponent, TextColorDirective, WidgetStatBComponent } from '@coreui/angular';

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
    RouterOutlet
  ]
  
})
export class WasteComponent {

}
