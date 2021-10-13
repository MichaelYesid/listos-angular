import { TestBed } from '@angular/core/testing';

import { FormFetcherService } from './form-fetcher.service';

describe('FormFetcherService', () => {
  let service: FormFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
