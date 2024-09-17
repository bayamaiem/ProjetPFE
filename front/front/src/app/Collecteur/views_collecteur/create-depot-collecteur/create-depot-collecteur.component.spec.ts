import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDepotCollecteurComponent} from './create-depot-collecteur.component';

describe('CreateDepotComponent', () => {
  let component:CreateDepotCollecteurComponent;
  let fixture: ComponentFixture<CreateDepotCollecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDepotCollecteurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateDepotCollecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
