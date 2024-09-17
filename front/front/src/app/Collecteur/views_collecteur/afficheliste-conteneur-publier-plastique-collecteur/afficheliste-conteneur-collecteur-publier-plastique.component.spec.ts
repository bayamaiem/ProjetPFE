import { ComponentFixture, TestBed } from '@angular/core/testing';

import {AffichelisteConteneurCollecteurPublierPlastiqueComponent} from './afficheliste-conteneur-collecteur-publier-plastique.component';

describe('AffichelisteConteneurCollecteurPublierPlastiqueComponent', () => {
  let component:  AffichelisteConteneurCollecteurPublierPlastiqueComponent;
  let fixture: ComponentFixture< AffichelisteConteneurCollecteurPublierPlastiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffichelisteConteneurCollecteurPublierPlastiqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AffichelisteConteneurCollecteurPublierPlastiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
