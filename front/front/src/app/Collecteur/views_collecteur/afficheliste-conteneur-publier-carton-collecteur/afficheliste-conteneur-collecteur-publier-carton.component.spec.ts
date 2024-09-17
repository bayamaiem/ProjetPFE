import { ComponentFixture, TestBed } from '@angular/core/testing';

import {AffichelisteConteneurCollecteurPublierCartonComponent } from './afficheliste-conteneur-collecteur-publier-carton.component';

describe(' AffichelisteConteneurCollecteurPublierCartonComponent', () => {
  let component:  AffichelisteConteneurCollecteurPublierCartonComponent;
  let fixture: ComponentFixture< AffichelisteConteneurCollecteurPublierCartonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AffichelisteConteneurCollecteurPublierCartonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AffichelisteConteneurCollecteurPublierCartonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
