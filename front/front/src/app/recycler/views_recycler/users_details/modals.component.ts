import { Component } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import {
  ButtonCloseDirective,
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ModalToggleDirective,
  PopoverDirective,
  ProgressBarComponent,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TextColorDirective,
  ThemeDirective,
  TooltipDirective,
  WidgetStatBComponent,
} from '@coreui/angular';
import {
  ActivatedRoute,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { UsersService } from 'src/app/service/users.service';
import { ConteneurService } from '../services/conteneur.service';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ModalComponent,
    RouterLink,
    RouterLinkActive,
    ModalHeaderComponent,
    ModalTitleDirective,
    ThemeDirective,
    ButtonCloseDirective,
    ModalBodyComponent,
    ModalFooterComponent,
    ButtonDirective,
    NgTemplateOutlet,
    ModalToggleDirective,
    PopoverDirective,
    TooltipDirective,
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
export class ModalsComponent {
  public liveDemoVisible = false;
  user: any;
  userId: any;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private containerService: ConteneurService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.getTypeSum();
    console.log('ssjdhsjdhshds', this.userId);
    this.usersService.getUserById(this.userId).subscribe(
      (res: any) => {
        console.log(res);
        this.user = res.userById;
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
  wasteSum: any | undefined;
  getTypeSum() {
    this.userId = this.route.snapshot.paramMap.get('id');

    this.containerService. getTypeSumscollecteurByID(this.userId).subscribe((res) => {
      console.log('sum', res);
      this.wasteSum = res;
    });
  }
  getStringValue(value: any): string {
    return value.toString();
  }
  toggleLiveDemo() {
    this.liveDemoVisible = !this.liveDemoVisible;
  }

  handleLiveDemoChange(event: boolean) {
    this.liveDemoVisible = event;
  }
}
