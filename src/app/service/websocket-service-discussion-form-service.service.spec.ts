import { TestBed } from '@angular/core/testing';

import { WebsocketServiceDiscussionFormServiceService } from './websocket-service-discussion-form-service.service';

describe('WebsocketServiceDiscussionFormServiceService', () => {
  let service: WebsocketServiceDiscussionFormServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsocketServiceDiscussionFormServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
