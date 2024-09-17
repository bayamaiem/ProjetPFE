import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDepotRecycleurComponent } from './update-depot-recycleur.component';

describe('UpdateDepotComponent', () => {
  let component: UpdateDepotRecycleurComponent;
  let fixture: ComponentFixture<UpdateDepotRecycleurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateDepotRecycleurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateDepotRecycleurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
