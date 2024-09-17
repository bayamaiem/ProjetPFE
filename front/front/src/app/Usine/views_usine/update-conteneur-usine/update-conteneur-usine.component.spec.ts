import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateConteneurUsineComponent } from './update-conteneur-usine.component';

describe('UpdateConteneurComponent', () => {
  let component: UpdateConteneurUsineComponent;
  let fixture: ComponentFixture<UpdateConteneurUsineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateConteneurUsineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateConteneurUsineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
