import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDepotRecycleurComponent} from './create-depot-recycleur.component';

describe('CreateDepotRecycleurComponent', () => {
  let component:CreateDepotRecycleurComponent;
  let fixture: ComponentFixture<CreateDepotRecycleurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDepotRecycleurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateDepotRecycleurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
