import { TestBed } from '@angular/core/testing';

import { QRServiceService } from './qrservice.service';

describe('QRServiceService', () => {
  let service: QRServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QRServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
