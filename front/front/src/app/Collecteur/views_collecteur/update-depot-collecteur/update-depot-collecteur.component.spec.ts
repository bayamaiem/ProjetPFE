import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDepotCollecteurComponent } from './update-depot-collecteur.component';

describe('UpdateDepotComponent', () => {
  let component: UpdateDepotCollecteurComponent;
  let fixture: ComponentFixture<UpdateDepotCollecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateDepotCollecteurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateDepotCollecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
