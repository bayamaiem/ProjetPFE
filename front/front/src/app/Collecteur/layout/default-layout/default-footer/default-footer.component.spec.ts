import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultFooterComponent3 } from './default-footer.component';

describe('DefaultFooterComponent', () => {
  let component: DefaultFooterComponent3;
  let fixture: ComponentFixture<DefaultFooterComponent3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [DefaultFooterComponent3]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultFooterComponent3);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
