import { TestBed } from '@angular/core/testing';

import { DiscussionFormServiceService } from './discussion-form-service.service';

describe('DiscussionFormServiceService', () => {
  let service: DiscussionFormServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscussionFormServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
