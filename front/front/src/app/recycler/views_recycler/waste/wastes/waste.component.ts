import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {
  ColComponent,
  ProgressComponent,
  RowComponent,
  TextColorDirective,
  WidgetStatBComponent,
} from '@coreui/angular';
import { WasteComponent2 } from '../details_dangaural_waste/waste.component';
import { DechetsService } from '../../services/dechets.service';
import { CommonModule } from '@angular/common';
import { ConteneurService } from '../../services/conteneur.service';

@Component({
  selector: 'app-waste',
  standalone: true,
  templateUrl: './waste.component.html',
  styleUrls: ['./waste.component.scss'],
  imports: [
    CommonModule,
    RowComponent,
    ColComponent,
    WidgetStatBComponent,
    ProgressComponent,
    RouterOutlet,
    WasteComponent2,
    RouterLink,
  ],
})
export class WasteComponent {
  constructor(private containerService: ConteneurService) {}
  wasteSum: any | undefined;
  ngOnInit(): void {
    this.getTypeSum();
  }
  getTypeSum() {
    this.containerService.getTypeSumsByDemandeurRecycleur().subscribe((res) => {
      this.wasteSum = res;
    });
  }
  getStringValue(value: any): string {
    return value.toString();
  }
}
