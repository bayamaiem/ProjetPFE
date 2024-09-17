import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichelisteConteneurUsineComponent } from './afficheliste-conteneur-usine.component';

describe('AffichelisteConteneurComponent', () => {
  let component: AffichelisteConteneurUsineComponent;
  let fixture: ComponentFixture<AffichelisteConteneurUsineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffichelisteConteneurUsineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AffichelisteConteneurUsineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
