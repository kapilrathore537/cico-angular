import { TestBed } from '@angular/core/testing';

import { FeesPayService } from './fees-pay.service';

describe('FeesPayService', () => {
  let service: FeesPayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeesPayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
