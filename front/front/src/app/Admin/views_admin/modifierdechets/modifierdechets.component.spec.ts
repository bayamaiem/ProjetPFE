import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierdechetsComponent } from './modifierdechets.component';

describe('ModifierdechetsComponent', () => {
  let component: ModifierdechetsComponent;
  let fixture: ComponentFixture<ModifierdechetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierdechetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifierdechetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
