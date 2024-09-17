import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichelistecodesusineComponent } from './affichelistecodesusine.component';

describe('AffichelistecodesusineComponent', () => {
  let component: AffichelistecodesusineComponent;
  let fixture: ComponentFixture<AffichelistecodesusineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffichelistecodesusineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AffichelistecodesusineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
