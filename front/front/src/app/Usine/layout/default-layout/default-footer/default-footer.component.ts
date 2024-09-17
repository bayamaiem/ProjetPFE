import { Component } from '@angular/core';
import { FooterComponent } from '@coreui/angular';

@Component({
    selector: 'app-default-footer2',
    templateUrl: './default-footer.component.html',
    styleUrls: ['./default-footer.component.scss'],
    standalone: true,
    
})
export class DefaultFooterComponent2 extends FooterComponent {
  constructor() {
    super();
  }
}
