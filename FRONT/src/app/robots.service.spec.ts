import { TestBed } from '@angular/core/testing';

import { RobotsService } from './robots.service';

describe('RobotsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RobotsService = TestBed.get(RobotsService);
    expect(service).toBeTruthy();
  });
});
