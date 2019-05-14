import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isNewUser: boolean;

  constructor(private router: Router, private usersService: UsersService) {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(new Array<User>()));
    }
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

  checkNewUser(currentUserName: string) {
    const users = JSON.parse(localStorage.getItem('users'));
    const currentUser = users.find(({ userName }) => userName === currentUserName);

    if (currentUser) {
      currentUser.isCurrent = true;
      localStorage.setItem('users', JSON.stringify(users));
      return false;
    }
    return true;
  }

  logout(currentUserName: string) {
    const users = JSON.parse(localStorage.getItem('users'));
    const currentUser = users.find(({ userName }) => userName === currentUserName);

    currentUser.isCurrent = false;
    localStorage.setItem('users', JSON.stringify(users));
  }
}
