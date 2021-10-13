import { TestBed } from '@angular/core/testing';

import { FormOptionsFetcherService } from './form-options-fetcher.service';

describe('FormOptionsFetcherService', () => {
  let service: FormOptionsFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormOptionsFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
