import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatGuardService {

  constructor(private router: Router, private usersService: UsersService, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.usersService.current().pipe(map(({ isCurrent }) => {
      if (!isCurrent) {
        this.router.navigate(['']);
      }
      return isCurrent;
    }));
  }

  canDeactivate(): boolean | Observable<boolean> {
    return this.usersService.current().pipe(map(({ userName }) => {
      this.authService.logout(userName);
      return true;
    }));
  }
}
