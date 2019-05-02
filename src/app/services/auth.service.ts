import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usersList: Array<User> = new Array<User>();
  currentUser: any;
  isNewUser: boolean;

  constructor(private router: Router, private usersService: UsersService) {
    const observable = this.usersService.current();  
    observable.subscribe(user => { this.currentUser = user; });
  }

  userNameValidator(control: FormControl): any {
    if (!control.value) { return null; }
    const valid = control.value.match(/^[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{0,}\s[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{1,}(\s[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{1,})?$/);
    return valid ? null : { userNameValidator: true };
  }

  signUp(displayName: string) {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(this.usersList));
    }

    this.isNewUser = this.checkNewUser(displayName);

    if (this.isNewUser) {
      this.usersList = this.getUsers();
      this.usersList.push({
        userName: displayName,
        isCurrent: true
      });
      localStorage.setItem('users', JSON.stringify(this.usersList));
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

}
