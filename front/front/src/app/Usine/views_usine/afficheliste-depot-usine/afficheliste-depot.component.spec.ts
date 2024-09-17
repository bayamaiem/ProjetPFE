import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichelisteDepotUsineComponent } from './afficheliste-depot-usine.component';

describe('AffichelisteDepotComponent', () => {
  let component:  AffichelisteDepotUsineComponent;
  let fixture: ComponentFixture< AffichelisteDepotUsineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AffichelisteDepotUsineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent( AffichelisteDepotUsineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
