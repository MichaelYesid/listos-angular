import { TestBed } from '@angular/core/testing';

import { FormPusherService } from './form-pusher.service';

describe('FormPusherService', () => {
  let service: FormPusherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormPusherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
