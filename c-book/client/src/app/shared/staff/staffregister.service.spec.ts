import { TestBed } from '@angular/core/testing';

import { StaffregisterService } from './staffregister.service';

describe('StaffregisterService', () => {
  let service: StaffregisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaffregisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
