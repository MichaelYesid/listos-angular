import { TestBed } from '@angular/core/testing';

import { LoadingModalService } from './loading-modal.service';

describe('LoadingModalService', () => {
  let service: LoadingModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
