import { TestBed } from '@angular/core/testing';

import { ChatServiceServiceService } from './chat-service-service.service';

describe('ChatServiceServiceService', () => {
  let service: ChatServiceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatServiceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
