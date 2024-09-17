import {
  CommonModule,
  DOCUMENT,
  NgStyle,
  NgTemplateOutlet,
} from '@angular/common';
import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  Renderer2,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChartOptions } from 'chart.js';
import {
  AvatarComponent,
  ButtonCloseDirective,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  CardModule,
  ColComponent,
  FormCheckLabelDirective,
  GridModule,
  GutterDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ModalToggleDirective,
  PopoverDirective,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TableModule,
  TextColorDirective,
  ThemeDirective,
  TooltipDirective,
  UtilitiesModule,
} from '@coreui/angular';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';

import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import { UsersService } from 'src/app/service/users.service';

interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
  details: [];
}

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TextColorDirective,
    RouterLink,
    RouterLinkActive,
    ButtonDirective,
    CardComponent,
    CardBodyComponent,
    RowComponent,
    ColComponent,
    IconDirective,
    ReactiveFormsModule,
    ButtonGroupComponent,
    FormCheckLabelDirective,
    ChartjsComponent,
    NgStyle,
    CardFooterComponent,
    GutterDirective,
    ProgressBarDirective,
    ProgressComponent,
    CardHeaderComponent,
    TableDirective,
    AvatarComponent,
    CardModule,
    TableModule,
    GridModule,
    UtilitiesModule,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ThemeDirective,
    ButtonCloseDirective,
    ModalBodyComponent,
    ModalFooterComponent,
    NgTemplateOutlet,
    ModalToggleDirective,
    PopoverDirective,
    TooltipDirective,
  ],
})
export class DashboardComponent implements OnInit {
  

  usinesUsers: any[] = [];
  filteredUsinesUsers: any[] = [];
  searchControl = new FormControl('');

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsinesUsers();
    this.searchControl.valueChanges.subscribe((searchText: string | null) => {
      this.filterUsinesUsers(searchText);
    });
    
  }
  filterUsinesUsers(searchText: string | null): void {
    console.log("Recherche:", searchText);  // Vérification du texte recherché
    if (!searchText) {
      this.filteredUsinesUsers = this.usinesUsers;
    } else {
      this.filteredUsinesUsers = this.usinesUsers.filter((user) =>
        user.username.toLowerCase().includes(searchText.toLowerCase()) 
      );
      console.log("Résultat filtré:", this.filteredUsinesUsers);  // Vérifiez si le filtrage fonctionne
    }
  }
  
  
  loadUsinesUsers(): void {
    this.usersService.getUsersByRole('usine').subscribe((res) => {
      this.usinesUsers = res;
      this.filteredUsinesUsers = res;
      console.log("Données chargées:", this.usinesUsers);  // Vérification des données
    });
  }
  
  trackById(index: number, user: any): number {
    return user.id;
  }
  


  
}
