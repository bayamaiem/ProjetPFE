import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCodesRecycleurComponent } from './create-codes-recycleur.component';

describe('CreateCodesRecycleurComponent', () => {
  let component: CreateCodesRecycleurComponent;
  let fixture: ComponentFixture<CreateCodesRecycleurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCodesRecycleurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateCodesRecycleurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
