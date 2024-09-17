import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { BrowserModule, Title } from '@angular/platform-browser';
import { SharedModule } from './shared.module'; // Importer le module partagé
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Injector} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export let AppInjector: Injector;
@Component({
  selector: 'app-root',
  template: '<router-outlet />',
  standalone: true,
  imports: [ CommonModule,FormsModule,
    RouterOutlet,SharedModule // Ajouter le module partagé
  ],
  
})
export class AppComponent implements OnInit {
  title = 'gestion de dechets ';

  constructor(
    private injector: Injector,
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
  ) {
    AppInjector = this.injector;
    this.titleService.setTitle(this.title);
    // iconSet singleton
    this.iconSetService.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
  }
}
