import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateConteneurCollecteurComponent } from './create-conteneur-collecteur.component';

describe('CreateConteneurComponent', () => {
  let component: CreateConteneurCollecteurComponent;
  let fixture: ComponentFixture<CreateConteneurCollecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateConteneurCollecteurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateConteneurCollecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
