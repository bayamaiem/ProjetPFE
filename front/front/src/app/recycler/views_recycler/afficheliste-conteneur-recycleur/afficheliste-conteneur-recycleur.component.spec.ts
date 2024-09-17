import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  AffichelisteConteneurRecycleurComponent } from './afficheliste-conteneur-recycleur.component';

describe(' AffichelisteConteneurRecycleurComponent', () => {
  let component:  AffichelisteConteneurRecycleurComponent;
  let fixture: ComponentFixture< AffichelisteConteneurRecycleurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AffichelisteConteneurRecycleurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent( AffichelisteConteneurRecycleurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
