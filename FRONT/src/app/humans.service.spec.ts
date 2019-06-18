import { TestBed } from '@angular/core/testing';

import { HumansService } from './humans.service';

describe('HumansService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HumansService = TestBed.get(HumansService);
    expect(service).toBeTruthy();
  });
});
