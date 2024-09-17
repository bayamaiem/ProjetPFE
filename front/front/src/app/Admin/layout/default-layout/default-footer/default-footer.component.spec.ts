import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultFooterComponent1 } from './default-footer.component';

describe('DefaultFooterComponent', () => {
  let component: DefaultFooterComponent1;
  let fixture: ComponentFixture<DefaultFooterComponent1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [DefaultFooterComponent1]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultFooterComponent1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
