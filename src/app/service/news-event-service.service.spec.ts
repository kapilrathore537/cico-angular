import { TestBed } from '@angular/core/testing';

import { NewsEventServiceService } from './news-event-service.service';

describe('NewsEventServiceService', () => {
  let service: NewsEventServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsEventServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
