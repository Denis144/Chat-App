import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: any;
  isNewUser: boolean;
  subscription: Subscription;

  constructor(private router: Router, private usersService: UsersService) {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(new Array<User>()));
    }
    const observable = this.usersService.current();  
    this.subscription = observable.subscribe(user => { this.currentUser = user; });
  }

  userNameValidator(control: FormControl): any {
    if (!control.value) { return null; }
    const valid = control.value.match(/^[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{0,}\s[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{1,}(\s[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{1,})?$/);
    return valid ? null : { userNameValidator: true };
  }

  signUp(displayName: string) {
    this.isNewUser = this.checkNewUser(displayName);

    if (this.isNewUser) {
      this.usersService.addUser({
        userName: displayName,
        isCurrent: true
      });
    }
  }

  checkNewUser(name: string) {
    const obj = JSON.parse(localStorage.getItem('users'));

    for (const key in obj) {
      if (obj[key]['userName'] === name) {
        obj[key]['isCurrent'] = true;
        localStorage.setItem('users', JSON.stringify(obj));
        return false;
      }
    }
    return true;

  }

  getUsers(): Array<User> {
    return JSON.parse(localStorage.getItem('users'));
  }

  logout() {
    const obj = JSON.parse(localStorage.getItem('users'));

    for (const key in obj) {
      if (obj[key]["userName"] === this.currentUser["userName"]) {
        obj[key]['isCurrent'] = false;
        localStorage.setItem('users', JSON.stringify(obj));
      }
    }
    this.router.navigate(['']);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
