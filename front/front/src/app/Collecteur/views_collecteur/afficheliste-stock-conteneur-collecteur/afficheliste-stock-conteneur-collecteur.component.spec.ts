import { ComponentFixture, TestBed } from '@angular/core/testing';

import {AffichelisteStockConteneurCollecteurComponent } from './afficheliste-stock-conteneur-collecteur.component';

describe('AffichelisteConteneurComponent', () => {
  let component: AffichelisteStockConteneurCollecteurComponent;
  let fixture: ComponentFixture< AffichelisteStockConteneurCollecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffichelisteStockConteneurCollecteurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AffichelisteStockConteneurCollecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
