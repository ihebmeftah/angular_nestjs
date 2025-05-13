import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const needAuth: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  if (!token) {
    router.navigate(['/auth/login']);
    return false;
  }
  return true;
};


export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  if (token) {
    router.navigate(['/dashboard']);
    return false;
  }
  return true;
};