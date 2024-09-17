import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCodeUsineComponentComponent } from './update-code-usine-component.component';

describe('UpdateCodeUsineComponentComponent', () => {
  let component: UpdateCodeUsineComponentComponent;
  let fixture: ComponentFixture<UpdateCodeUsineComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCodeUsineComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateCodeUsineComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
