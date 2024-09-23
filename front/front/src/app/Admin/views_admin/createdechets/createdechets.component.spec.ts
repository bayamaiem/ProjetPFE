import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedechetsComponent } from './createdechets.component';

describe('CreatedechetsComponent', () => {
  let component: CreatedechetsComponent;
  let fixture: ComponentFixture<CreatedechetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatedechetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatedechetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
