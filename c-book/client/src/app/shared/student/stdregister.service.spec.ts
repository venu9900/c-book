import { TestBed } from '@angular/core/testing';

import { StdregisterService } from './stdregister.service';

describe('StdregisterService', () => {
  let service: StdregisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StdregisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
