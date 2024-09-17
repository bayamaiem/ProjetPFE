import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultFooterComponent2 } from './default-footer.component';

describe('DefaultFooterComponent', () => {
  let component: DefaultFooterComponent2;
  let fixture: ComponentFixture<DefaultFooterComponent2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [DefaultFooterComponent2]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultFooterComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
