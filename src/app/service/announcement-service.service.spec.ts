import { TestBed } from '@angular/core/testing';

import { AnnouncementServiceService } from './announcement-service.service';

describe('AnnouncementServiceService', () => {
  let service: AnnouncementServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnouncementServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
