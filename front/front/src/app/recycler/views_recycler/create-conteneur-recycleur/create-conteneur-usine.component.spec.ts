import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateConteneurUsineComponent } from './create-conteneur-usine.component';

describe('CreateConteneurComponent', () => {
  let component: CreateConteneurUsineComponent;
  let fixture: ComponentFixture<CreateConteneurUsineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateConteneurUsineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateConteneurUsineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
