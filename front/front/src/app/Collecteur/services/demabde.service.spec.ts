import { TestBed } from '@angular/core/testing';

import { DemabdeService } from './demabde.service';

describe('DemabdeService', () => {
  let service: DemabdeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemabdeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
