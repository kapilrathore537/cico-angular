import { TestBed } from '@angular/core/testing';

import { TechnologyStackServiceService } from './technology-stack-service.service';

describe('TechnologyStackServiceService', () => {
  let service: TechnologyStackServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnologyStackServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
