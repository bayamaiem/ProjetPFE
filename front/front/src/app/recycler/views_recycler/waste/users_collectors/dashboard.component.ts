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
  collectorsUsers: any[] = [];
  searchControl = new FormControl('');
  filteredCollecteursUsers: any[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadCollecteurUsers();

    // Filter users when the search text changes
    this.searchControl.valueChanges.subscribe((searchText: string | null) => {
      this.filterCollecteursUsers(searchText);
    });
  }

  // Toggle user activation status
  changeUserActivation(id: number, active: boolean) {
    const updatedStatus = !active; // Toggle the active state
    console.log('New status:', updatedStatus);

    this.usersService.changeUserStatus(id, updatedStatus).subscribe(() => {
      console.log(`User ${id} activation status updated to ${updatedStatus}`);
      this.collectorsUsers = this.collectorsUsers.map(user => {
        if (user.id === id) {
          return { ...user, active: updatedStatus };
        }
        return user;
      });
      this.filterCollecteursUsers(this.searchControl.value); // Update filtered list
    });
  }

  // Filter users by search text
  filterCollecteursUsers(searchText: string | null): void {
    if (!searchText) {
      this.filteredCollecteursUsers = [...this.collectorsUsers]; // Reset filter if no search text
    } else {
      this.filteredCollecteursUsers = this.collectorsUsers.filter((user) =>
        user.username.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    console.log('Filtered users:', this.filteredCollecteursUsers);
  }

  // Load users with role 'collecteur'
  loadCollecteurUsers(): void {
    this.usersService.getUsersByRole('collecteur').subscribe((res: any) => {
      this.collectorsUsers = res;
      this.filteredCollecteursUsers = [...this.collectorsUsers]; // Initialize filtered list
      console.log('Loaded users:', this.collectorsUsers);
    });
  }

  // Track users by ID for efficient rendering
  trackById(index: number, user: any): number {
    return user.id;
  }
}