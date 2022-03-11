import { TestBed } from '@angular/core/testing';

import { GetDataPointsService } from './get-data-points.service';

describe('GetDataPointsService', () => {
  let service: GetDataPointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDataPointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
