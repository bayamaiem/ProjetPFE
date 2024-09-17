import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichelisteConteneurRecycleurPublierTextilleComponent} from './afficheliste-conteneur-recycleur-publier-textille.component';

describe('AffichelisteConteneurRecycleurPublierTextilleComponent', () => {
  let component: AffichelisteConteneurRecycleurPublierTextilleComponent;
  let fixture: ComponentFixture< AffichelisteConteneurRecycleurPublierTextilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AffichelisteConteneurRecycleurPublierTextilleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent( AffichelisteConteneurRecycleurPublierTextilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
