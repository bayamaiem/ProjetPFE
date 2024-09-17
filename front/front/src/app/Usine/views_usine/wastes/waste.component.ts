import { Component, OnInit } from '@angular/core';
import { WidgetComponent } from '../../widget/widget.component';
import { RouterOutlet } from '@angular/router';
import {
  ColComponent,
  ProgressBarComponent,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TextColorDirective,
  WidgetStatBComponent,
} from '@coreui/angular';
import { ConteneurService } from '../../../recycler/views_recycler/services/conteneur.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-waste',
  standalone: true,
  templateUrl: './waste.component.html',
  styleUrls: ['./waste.component.scss'],
  imports: [
    CommonModule,
    RowComponent,
    ColComponent,
    TextColorDirective,
    WidgetStatBComponent,
    ProgressBarDirective,
    ProgressComponent,
    ProgressBarComponent,
    RouterOutlet,
  ],
})
export class WasteComponent implements OnInit {
  constructor(private containerService: ConteneurService) {}
  wasteSum: any | undefined;
  ngOnInit(): void {
    this.getTypeSum();
  }
  getTypeSum() {
    this.containerService.getContainerDechetSumType().subscribe((res) => {
      console.log('sum', res);
      this.wasteSum = res;
    });
  }
  getStringValue(value: any): string {
    return value.toString();
  }
}
