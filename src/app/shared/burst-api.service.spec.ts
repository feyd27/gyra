import { TestBed } from '@angular/core/testing';

import { BurstApiService } from './burst-api.service';

describe('BurstApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BurstApiService = TestBed.get(BurstApiService);
    expect(service).toBeTruthy();
  });
});
