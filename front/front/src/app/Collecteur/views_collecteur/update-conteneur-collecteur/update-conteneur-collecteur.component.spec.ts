import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  UpdateConteneurCollecteurComponent} from './update-conteneur-collecteur.component';

describe(' UpdateConteneurCollecteurComponent', () => {
  let component: UpdateConteneurCollecteurComponent;
  let fixture: ComponentFixture< UpdateConteneurCollecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ UpdateConteneurCollecteurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent( UpdateConteneurCollecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
