import { TestBed } from '@angular/core/testing';

import { WinconditionsService } from './winconditions.service';

describe('WinconditionsService', () => {
  let service: WinconditionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WinconditionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
