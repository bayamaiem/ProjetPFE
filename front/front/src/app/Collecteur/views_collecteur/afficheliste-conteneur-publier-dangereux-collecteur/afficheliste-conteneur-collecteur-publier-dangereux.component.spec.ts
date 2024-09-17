import { ComponentFixture, TestBed } from '@angular/core/testing';

import {AffichelisteConteneurCollecteurPublierDangeruxComponent} from './afficheliste-conteneur-collecteur-publier-dangereux.component';

describe('AffichelisteConteneurCollecteurPublierTextilleComponent', () => {
  let component:   AffichelisteConteneurCollecteurPublierDangeruxComponent;
  let fixture: ComponentFixture<  AffichelisteConteneurCollecteurPublierDangeruxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AffichelisteConteneurCollecteurPublierDangeruxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent( AffichelisteConteneurCollecteurPublierDangeruxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
