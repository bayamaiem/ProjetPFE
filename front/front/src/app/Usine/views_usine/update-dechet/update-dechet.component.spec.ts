import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDechetComponent } from './update-dechet.component';

describe('UpdateDechetComponent', () => {
  let component: UpdateDechetComponent;
  let fixture: ComponentFixture<UpdateDechetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateDechetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateDechetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
