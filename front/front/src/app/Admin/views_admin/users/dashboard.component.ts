import { CommonModule, DOCUMENT, NgStyle } from '@angular/common';
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
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TextColorDirective,
} from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';
import { UsersService } from 'src/app/service/users.service';
import { AuthService } from '../../../service/auth.service';
import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ModalComponent } from '../../../components/modal/modal.component';
import { ModalService } from 'src/app/service/modal.service';

interface IUser {
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
  email: string;
  active: boolean;
  uername: string;
  avatar: any;
}

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TextColorDirective,
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
    RouterLink,
    RouterOutlet,
  ],
})
export class DashboardComponent implements OnInit {
  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  readonly #document: Document = inject(DOCUMENT);
  readonly #renderer: Renderer2 = inject(Renderer2);
  readonly #chartsData: DashboardChartsData = inject(DashboardChartsData);
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private modalService: ModalService
  ) {}
  public mainChart: IChartProps = { type: 'line' };
  public mainChartRef: WritableSignal<any> = signal(undefined);
  #mainChartRefEffect = effect(() => {
    if (this.mainChartRef()) {
      this.setChartStyles();
    }
  });
  public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new FormGroup({
    trafficRadio: new FormControl('Month'),
  });

  allUsers: any;
  token?: string | null;
  ngOnInit(): void {
    this.token = this.authService.getToken();
    this.usersService.getAllUsers(this.token).subscribe((res) => {
      this.allUsers = res;
    });
    this.initCharts();
    this.updateChartOnColorModeChange();
  }

  initCharts(): void {
    this.mainChart = this.#chartsData.mainChart;
  }

  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.#chartsData.initMainChart(value);
    this.initCharts();
  }

  handleChartRef($chartRef: any) {
    if ($chartRef) {
      this.mainChartRef.set($chartRef);
    }
  }

  updateChartOnColorModeChange() {
    const unListen = this.#renderer.listen(
      this.#document.documentElement,
      'ColorSchemeChange',
      () => {
        this.setChartStyles();
      }
    );

    this.#destroyRef.onDestroy(() => {
      unListen();
    });
  }

  openDeleteModal(id: Number, active: boolean): void {
    this.modalService
      .openModal(
        'Confirmer le changement',
        'Etes-vous sûr de vouloir modifier le statut de cet utilisateur ?'
      )
      .then(() => this.changeUserActivation(id, active))
      .catch(() => console.log('cancelled'));
  }

  setChartStyles() {
    if (this.mainChartRef()) {
      setTimeout(() => {
        const options: ChartOptions = { ...this.mainChart.options };
        const scales = this.#chartsData.getScales();
        this.mainChartRef().options.scales = { ...options.scales, ...scales };
        this.mainChartRef().update();
      });
    }
  }

  changeUserActivation(id: Number, active: boolean) {
    active = !active;
    console.log('status', active);
    this.token = this.authService.getToken();
    this.usersService.changeUserStatus(id, active).subscribe({
      next: (response) => {
        window.location.reload();
      },
      error: (error) => {
        console.error('Error ', error);
      },
    });
  }
}
