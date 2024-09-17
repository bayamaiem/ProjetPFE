import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichelistecodesrecycleurComponent } from './affichelistecodesrecycleur.component';

describe('AffichelistecodesrecycleurComponent', () => {
  let component: AffichelistecodesrecycleurComponent;
  let fixture: ComponentFixture<AffichelistecodesrecycleurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffichelistecodesrecycleurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AffichelistecodesrecycleurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
