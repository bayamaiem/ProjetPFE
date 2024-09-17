import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichelisteDechetsComponent } from './afficheliste-dechets.component';

describe('AffichelisteDechetsComponent', () => {
  let component: AffichelisteDechetsComponent;
  let fixture: ComponentFixture<AffichelisteDechetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffichelisteDechetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AffichelisteDechetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
