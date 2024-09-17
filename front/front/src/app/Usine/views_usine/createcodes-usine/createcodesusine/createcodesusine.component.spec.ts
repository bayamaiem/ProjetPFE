import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecodesusineComponent } from './createcodesusine.component';

describe('CreatecodesusineComponent', () => {
  let component: CreatecodesusineComponent;
  let fixture: ComponentFixture<CreatecodesusineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatecodesusineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatecodesusineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
