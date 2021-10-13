import { TestBed } from '@angular/core/testing';

import { FormOptionsSelfmadeFetcherService } from './form-options-selfmade-fetcher.service';

describe('FormOptionsSelfmadeFetcherService', () => {
  let service: FormOptionsSelfmadeFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormOptionsSelfmadeFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
