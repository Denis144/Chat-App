import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  $user = new BehaviorSubject<any>('');

  constructor() {}

  addUser(user?: User): void {
    const users = JSON.parse(localStorage.getItem('users'));
    if (user) {
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
    }

    const currentUser = users.find(({ isCurrent }) => isCurrent);
    currentUser ? this.$user.next(currentUser) : this.$user.next('');
  }

  current() {
    this.addUser();
    return this.$user.asObservable();
  }
}
