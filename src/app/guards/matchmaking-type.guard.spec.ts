import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { matchmakingTypeGuard } from './matchmaking-type.guard';

describe('matchmakingTypeGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => matchmakingTypeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
