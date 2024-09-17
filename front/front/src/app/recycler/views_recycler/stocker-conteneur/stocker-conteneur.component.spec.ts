import { ComponentFixture, TestBed } from '@angular/core/testing';

import {StockerConteneurComponent  } from './stocker-conteneur.component';

describe('StockerConteneurComponent ', () => {
  let component: StockerConteneurComponent ;
  let fixture: ComponentFixture<StockerConteneurComponent >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockerConteneurComponent ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockerConteneurComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
