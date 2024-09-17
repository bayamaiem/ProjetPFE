import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichelisteConteneurCollecteurComponent } from './afficheliste-conteneur-collecteur.component';

describe(' AffichelisteConteneurCollecteurComponent', () => {
  let component:  AffichelisteConteneurCollecteurComponent;
  let fixture: ComponentFixture< AffichelisteConteneurCollecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AffichelisteConteneurCollecteurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent( AffichelisteConteneurCollecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
