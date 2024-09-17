import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDechetsComponent } from './create-dechets.component';

describe('CreateDechetsComponent', () => {
  let component: CreateDechetsComponent;
  let fixture: ComponentFixture<CreateDechetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDechetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateDechetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
