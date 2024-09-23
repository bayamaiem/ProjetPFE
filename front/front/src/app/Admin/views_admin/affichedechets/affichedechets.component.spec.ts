import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichedechetsComponent } from './affichedechets.component';

describe('AffichedechetsComponent', () => {
  let component: AffichedechetsComponent;
  let fixture: ComponentFixture<AffichedechetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffichedechetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AffichedechetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
