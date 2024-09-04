import { CanActivateFn } from '@angular/router';

export const matchmakingTypeGuard: CanActivateFn = (route, state) => {
  const type = route.params['type'];
  return !(type !== 'solo' && type !== 'doubles');
};
