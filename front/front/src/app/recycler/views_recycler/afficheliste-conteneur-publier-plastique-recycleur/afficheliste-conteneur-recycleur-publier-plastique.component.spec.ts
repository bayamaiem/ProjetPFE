import { ComponentFixture, TestBed } from '@angular/core/testing';

import {AffichelisteConteneurRecycleurPublierPlastiqueComponent } from './afficheliste-conteneur-recycleur-publier-plastique.component';

describe('AffichelisteConteneurRecycleurPublierPlastiqueComponent ', () => {
  let component: AffichelisteConteneurRecycleurPublierPlastiqueComponent ;
  let fixture: ComponentFixture< AffichelisteConteneurRecycleurPublierPlastiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffichelisteConteneurRecycleurPublierPlastiqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AffichelisteConteneurRecycleurPublierPlastiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
