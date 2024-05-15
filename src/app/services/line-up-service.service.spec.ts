import { TestBed } from '@angular/core/testing';

import { LineUpServiceService } from './line-up-service.service';

describe('LineUpServiceService', () => {
  let service: LineUpServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineUpServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
