import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichelisteConteneurRecycleurPublierCartonComponent  } from './afficheliste-conteneur-recycleur-publier-carton.component';

describe('  AffichelisteConteneurRecycleurPublierCartonComponent ', () => {
  let component:   AffichelisteConteneurRecycleurPublierCartonComponent ;
  let fixture: ComponentFixture< AffichelisteConteneurRecycleurPublierCartonComponent >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AffichelisteConteneurRecycleurPublierCartonComponent ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent( AffichelisteConteneurRecycleurPublierCartonComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
