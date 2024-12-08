// import { inject } from '@angular/core';
// import { CanActivateFn } from '@angular/router';
// import { Router } from '@angular/router';

// export const authGuard: CanActivateFn = () => {
//   const router = inject(Router);

//   // here we need to check if user is logged in or not
//   // in my case with the localstorage data

//   if (typeof localStorage !== 'undefined') {
//     const localToken = localStorage.getItem('token');

//     if (localToken) {
//       const role = JSON.parse(atob(localToken.split('.')[1])).role; // decode role from token
//       if (role === 'ADMIN') return true; // Allow access if admin
//     }
//   }

//   // if we do not have the token in local storage, navigate back to the login page
//   router.navigate(['/login']);
//   return false;
// };


// ********************************************************////


///// incorporating ADMIN AND SALES ROLES

import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);

  // Check if localStorage is available
  if (typeof localStorage !== 'undefined') {
    // Check if user is logged in by verifying the presence of a token in localStorage
    const localToken = localStorage.getItem('token');

    if (localToken) {
      // Decode the token to extract the role
      const decodedToken = JSON.parse(atob(localToken.split('.')[1]));
      const role = decodedToken.role;

      // Check if the route is restricted by role
      if (route.data['roles'] && route.data['roles'].indexOf(role) === -1) {
        // Role not authorized, redirect to home page
        router.navigate(['/']);
        return false;
      }

      // Authorized, return true
      return true;
    }
  }

  // If token is not present or localStorage is not available, navigate to the login page
  router.navigate(['/login']);
  return false;
};

