import { TestBed } from '@angular/core/testing';

import { ChapterServiceService } from './chapter-service.service';

describe('ChapterServiceService', () => {
  let service: ChapterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChapterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
