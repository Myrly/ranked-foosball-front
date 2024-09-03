import { CanActivateFn } from '@angular/router';

export const matchmakingTypeGuard: CanActivateFn = (route, state) => {
  const type = route.params['type'];
  if (type !== 'solo' && type !== 'set-doubles' && type !== 'random-doubles') {
    return false
  }
  return true;
};
