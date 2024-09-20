import { Component, CUSTOM_ELEMENTS_SCHEMA, DestroyRef, effect, inject, Renderer2, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConteneurService } from '../../../recycler/views_recycler/services/conteneur.service';
import { CardModule } from '@coreui/angular';
import { ButtonModule } from '@coreui/angular';

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
import { ChartData, ChartOptions, ChartType} from 'chart.js';
import {  ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-waste1',
  standalone: true,
  templateUrl: './waste.component.html',
  styleUrls: ['./waste.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  // Ajoutez ceci

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
    CommonModule,
    ChartjsComponent,
    RowComponent,
    ColComponent,
    TextColorDirective,
    WidgetStatBComponent,
    ProgressBarDirective,
    ProgressComponent,
    ProgressBarComponent,
    RouterOutlet,
    CardModule ,
    ButtonModule, // Ajoutez ButtonModule ici pour c-button-group,
    ColComponent,
    TextColorDirective,
    WidgetStatBComponent,
    ProgressBarDirective,
    ProgressComponent,
    ProgressBarComponent,
    RouterOutlet,
    CardModule, // Pour c-card
    ButtonModule ,
    ReactiveFormsModule, // Assurez-vous d'importer ReactiveFormsModule
    ButtonModule // Assurez-vous d'importer ButtonModule ici pour c-button-group

  ],
})
export class WasteComponent {

 
  constructor(private containerService: ConteneurService) {}


 
  ngOnInit(): void {
    this.getTypeSum();
    this.getUserCounts();
    /*this.updateChartOnColorModeChange();*/
  }
  userCounts: { [key: string]: number } | undefined;

  wasteSum: { [key: string]: number } | undefined;
  // Chart properties
  
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  public userChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  
  public pieChartType: ChartType = 'pie';

  // Chart labels (optional if part of pieChartData)
  public chartLabels = ['Waste Type 1', 'Waste Type 2', 'Waste Type 3'];
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Waste Type 1', 'Waste Type 2', 'Waste Type 3'],
    datasets: [
      {
        data: [300, 500, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };
  public data: ChartData<'pie'> = {
    labels: [], // Initial empty labels
    datasets: [{
      backgroundColor: [],
      data: []
    }]
  };
  public userChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [],
    }]
  };

  
  getTypeSum() {
    this.containerService.getContainerDechetSumTypeAdmin().subscribe((res) => {
      console.log('sum', res);
      this.wasteSum = res;

      // Update chart data and labels dynamically
      this.updateChartData(res);
    });
  }

  getUserCounts() {
    this.containerService.getUserCounts().subscribe((res) => {
      console.log('user counts', res);
      this.updateUserChartData(res);
    });
  }
  updateChartData(responseData: { [key: string]: number }) {
    const labels = Object.keys(responseData);
    const data = Object.values(responseData) as number[];

    this.data = {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: labels.map((_, index) => this.getColorForIndex(index)),
      }]
    };

    console.log('Updated chart data:', this.data);
  }
  updateUserChartData(responseData: { [key: string]: number }) {
    const labels = Object.keys(responseData);
    const data = Object.values(responseData) as number[];

    this.userChartData = {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: labels.map((_, index) => this.getColorForIndex(index)),
      }]
    };

    console.log('Updated user chart data:', this.userChartData);
  }
  

  getColorForIndex(index: number): string {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#41B883', '#E46651', '#00D8FF'];
    return colors[index % colors.length];
  }


  getStringValue(value: any): string {
    return value.toString();
  }
 
  
  
  

}

 

