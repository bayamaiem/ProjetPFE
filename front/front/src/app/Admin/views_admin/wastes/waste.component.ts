import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConteneurService } from '../../../recycler/views_recycler/services/conteneur.service';

import {
  ColComponent,
  ProgressBarComponent,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TextColorDirective,
  WidgetStatBComponent,
} from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { ChartDataset, ChartOptions, ChartType} from 'chart.js';
@Component({
  selector: 'app-waste1',
  standalone: true,
  templateUrl: './waste.component.html',
  styleUrls: ['./waste.component.scss'],
  imports: [
    CommonModule,
    ChartjsComponent ,
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
export class WasteComponent {

 
  constructor(private containerService: ConteneurService) {}


  
  ngOnInit(): void {
    this.getTypeSum();
    /*this.updateChartOnColorModeChange();*/
  }
  
  wasteSum: any | undefined;

  // Chart properties
  chartOptions: ChartOptions = {
    responsive: true,
  };
  chartLabels: string[] = [];  // Updated type
  chartData: ChartDataset<'bar'>[] = [{ data: [], label: 'Waste Sum' }];
  chartType: ChartType = 'bar';
  getTypeSum() {
    this.containerService.getContainerDechetSumTypeAdmin().subscribe((res) => {
      console.log('sum', res);
      this.wasteSum = res;

      // Update chart data and labels based on the response
      this.updateChartData(res);
    });
  }

  getStringValue(value: any): string {
    return value.toString();
  }

  updateChartData(wasteData: any) {
    this.chartLabels = Object.keys(wasteData).map(key => this.getStringValue(key));
    this.chartData = [{ data: Object.values(wasteData), label: 'Waste Sum' }];
  }
  
  

  

 
}
