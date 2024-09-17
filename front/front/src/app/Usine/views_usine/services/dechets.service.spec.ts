import { TestBed } from '@angular/core/testing';

import { DechetsService } from './dechets.service';

describe('DechetsService', () => {
  let service: DechetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DechetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
