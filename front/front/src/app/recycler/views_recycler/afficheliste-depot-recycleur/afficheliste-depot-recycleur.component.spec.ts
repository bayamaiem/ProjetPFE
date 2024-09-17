import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichelisteDepotRecycleurComponent } from './afficheliste-depot-recycleur.component';

describe('AffichelisteDepotRecycleurComponent', () => {
  let component:AffichelisteDepotRecycleurComponent;
  let fixture: ComponentFixture<AffichelisteDepotRecycleurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffichelisteDepotRecycleurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AffichelisteDepotRecycleurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
