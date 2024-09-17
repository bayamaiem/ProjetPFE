import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichelisteConteneurCollecteurPublierTextilleComponent} from './afficheliste-conteneur-collecteur-publier-textille.component';

describe('AffichelisteConteneurCollecteurPublierTextilleComponent', () => {
  let component:   AffichelisteConteneurCollecteurPublierTextilleComponent;
  let fixture: ComponentFixture<  AffichelisteConteneurCollecteurPublierTextilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AffichelisteConteneurCollecteurPublierTextilleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent( AffichelisteConteneurCollecteurPublierTextilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
