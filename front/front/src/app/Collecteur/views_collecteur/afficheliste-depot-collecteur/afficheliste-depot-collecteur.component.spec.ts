import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichelisteDepotCollecteurComponent  } from './afficheliste-depot-collecteur.component';

describe('AffichelisteDepotCollecteurComponent ', () => {
  let component:  AffichelisteDepotCollecteurComponent ;
  let fixture: ComponentFixture< AffichelisteDepotCollecteurComponent >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AffichelisteDepotCollecteurComponent ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent( AffichelisteDepotCollecteurComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
