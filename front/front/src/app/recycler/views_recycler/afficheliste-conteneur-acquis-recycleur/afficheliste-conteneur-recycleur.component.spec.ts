import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  AffichelisteConteneurRecycleurAcquisComponent } from './afficheliste-conteneur-recycleur-aquis.component';

describe('AffichelisteConteneurRecycleurComponent', () => {
  let component:  AffichelisteConteneurRecycleurAcquisComponent;
  let fixture: ComponentFixture< AffichelisteConteneurRecycleurAcquisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AffichelisteConteneurRecycleurAcquisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent( AffichelisteConteneurRecycleurAcquisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
