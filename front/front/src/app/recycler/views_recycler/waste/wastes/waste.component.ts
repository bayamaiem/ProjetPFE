import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { ChartData } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { ChartjsComponent } from '@coreui/angular-chartjs';

@Component({
  selector: 'app-waste',
  standalone: true,
  templateUrl: './waste.component.html',
  styleUrls: ['./waste.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  imports: [
    CommonModule,
    ChartjsComponent ,

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
  constructor(private containerService: ConteneurService ,private cdr: ChangeDetectorRef , private http: HttpClient) {}
  wasteSum: any | undefined;


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
  dataMovementdatesortie : ChartData<'bar'> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe'],
    }]
  };
  ngOnInit(): void {
    this.getTypeSum();
    this.loadDefaultChartDataachat();
  }
  getTypeSum() {
    this.containerService.getTypeSumsByDemandeurRecycleur().subscribe((res) => {
      this.wasteSum = res;
      this.updateChartData(res);
    });
  }
  getStringValue(value: any): string {
    return value.toString();
  }

  updateChartData(responseData: { [key: string]: number }) {
    const labels = Object.keys(responseData);
    const data = Object.values(responseData) as number[];
  
    if (data.length === 0) {
      console.error('Data array is empty, chart will not render.');
      return;
    }
  
    this.data = {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: labels.map((_, index) => this.getColorForIndex(index)),
      }]
    };
  
    // Ensure change detection triggers the chart update
    this.cdr.detectChanges();
    console.log('Updated chart data:', this.data);
  }
  

  getColorForIndex(index: number): string {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#41B883', '#E46651', '#00D8FF'];
    return colors[index % colors.length];
  }

  loadDefaultChartDataachat() {
    // Envoyer la requête pour récupérer les mouvements par défaut
    this.http.get('http://127.0.0.1:8001/api/filterMovementsrecycleurachat').subscribe((response: any) => {
      // Mettre à jour les données du graphique avec la réponse de l'API
      this.dataMovementdatesortie = {
        labels: response.labels, // Les labels pour les barres
        datasets: [
          { label:'vente',
            data: response.data, // Les données à afficher
            backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe'], // Couleurs pour chaque barre
          }
        ]
      };
    }, error => {
      console.error('Erreur lors de la récupération des données', error);
    });
  }
  

}
