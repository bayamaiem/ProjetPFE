import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { ChartData } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-waste2',
  standalone: true,
  templateUrl: './waste.component.html',
  styleUrls: ['./waste.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  imports: [
    CommonModule,
    RowComponent,
    ChartjsComponent ,
    FormsModule ,// Ajouter FormsModule ici
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
  constructor(private containerService: ConteneurService , private cdr: ChangeDetectorRef , private http: HttpClient ) {}
  wasteSum: any | undefined;
  ngOnInit(): void {
    this.getTypeSum();
    this.loadDefaultChartData();
    this.  loadDefaultChartDataachat() ; // Chargez les données par défaut au démarrage

  }

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
  selectedDate: string | undefined;
  selectedCollecteur: string | undefined;
  dataMovementdate: ChartData<'bar'> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe'],
    }]
  };
  dataMovementdatesortie : ChartData<'bar'> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe'],
    }]
  };


  getTypeSum() {
    this.containerService.getTypeSumscollecteur().subscribe((res) => {
      console.log('sum', res);
      this.wasteSum = res;
      this.updateChartData(res);

    });
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

  getStringValue(value: any): string {
    return value.toString();
  }

  loadDefaultChartData() {
    // Envoyer la requête pour récupérer les mouvements par défaut
    this.http.get('http://127.0.0.1:8001/api/filterMovementscollecteurvente').subscribe((response: any) => {
      // Mettre à jour les données du graphique avec la réponse de l'API
      this.dataMovementdate = {
        labels: response.labels, // Les labels pour les barres
        datasets: [
          { label:'achat',
            data: response.data, // Les données à afficher
            backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe'], // Couleurs pour chaque barre
          }
        ]
      };
    }, error => {
      console.error('Erreur lors de la récupération des données', error);
    });
  }

  loadDefaultChartDataachat() {
    // Envoyer la requête pour récupérer les mouvements par défaut
    this.http.get('http://127.0.0.1:8001/api/filterMovementscollecteursortie').subscribe((response: any) => {
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
