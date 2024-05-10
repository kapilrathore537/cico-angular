import { TestBed } from '@angular/core/testing';

import { JavaScriptLoaderService } from './java-script-loader.service';

describe('JavaScriptLoaderService', () => {
  let service: JavaScriptLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JavaScriptLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
