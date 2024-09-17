import { ComponentFixture, TestBed } from '@angular/core/testing';

import {AffichelisteConteneurRecycleurPublierDangeruxComponent} from './afficheliste-conteneur-recycleur-publier-dangereux.component';

describe('AffichelisteConteneurRecycleurPublierDangeruxComponent', () => {
  let component:  AffichelisteConteneurRecycleurPublierDangeruxComponent;
  let fixture: ComponentFixture< AffichelisteConteneurRecycleurPublierDangeruxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffichelisteConteneurRecycleurPublierDangeruxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AffichelisteConteneurRecycleurPublierDangeruxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
