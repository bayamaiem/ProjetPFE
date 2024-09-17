import { ComponentFixture, TestBed } from '@angular/core/testing';

import {UpdateCodeRecycleurComponent } from './update-code-recycleur.component';

describe('UpdateCodeRecycleurComponent', () => {
  let component: UpdateCodeRecycleurComponent;
  let fixture: ComponentFixture<UpdateCodeRecycleurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCodeRecycleurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateCodeRecycleurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
