import { TestBed } from '@angular/core/testing';

import { TeamServesService } from './team-serves.service';

describe('TeamServesService', () => {
  let service: TeamServesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamServesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
