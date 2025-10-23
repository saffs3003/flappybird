import { Injectable } from '@angular/core';
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const allowedRoles = childRoute.data['roles'] || (childRoute.parent?.data['roles'] as string[]);
    const userRole = this.authService.getRole();
    console.log(`allowedRoles${allowedRoles}`);
    console.log(`userRole:${userRole}`);
    if (userRole && allowedRoles && allowedRoles.includes(userRole)) {
      console.log('return true');
      return true;
    }
    console.log('return false');

    return false;
  }
}
