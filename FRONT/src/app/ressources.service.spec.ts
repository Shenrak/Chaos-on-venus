import { TestBed } from '@angular/core/testing';

import { RessourcesService } from './ressources.service';

describe('RessourcesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RessourcesService = TestBed.get(RessourcesService);
    expect(service).toBeTruthy();
  });
});
