import { TestBed } from '@angular/core/testing';

import { WithLoadingService } from './with-loading.service';

describe('WithLoadingService', () => {
  let service: WithLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WithLoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
