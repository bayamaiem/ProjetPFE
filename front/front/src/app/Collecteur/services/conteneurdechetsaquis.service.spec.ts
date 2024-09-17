import { TestBed } from '@angular/core/testing';

import { ConteneurdechetsaquisService } from './conteneurdechetsaquis.service';

describe('ConteneurdechetsaquisService', () => {
  let service: ConteneurdechetsaquisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConteneurdechetsaquisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
