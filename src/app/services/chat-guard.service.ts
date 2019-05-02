import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChatGuardService {
  currentUser: any;

  constructor(private router: Router, private usersService: UsersService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{
    const observable = this.usersService.current();  
    observable.subscribe(user => { this.currentUser = user; });

    if(this.currentUser['isCurrent']) {
      return true;
    }else {
      this.router.navigate(['']);
    }
 }
}
