import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuardsGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);
  console.log('token', token);
  if (token) {
    return true;
  } else {
    router.navigate(['/sign-in']);
    return false;
  }
  return true;
};
