import { TestBed } from '@angular/core/testing';

import { KafkaServiceService } from './kafka-service.service';

describe('KafkaServiceService', () => {
  let service: KafkaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KafkaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
