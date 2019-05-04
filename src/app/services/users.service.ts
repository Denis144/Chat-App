import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  subscriberUser = new BehaviorSubject<any>('');

  constructor() {}

  addUser(user?: User): void {
    const obj = JSON.parse(localStorage.getItem('users'));
    if(user) {
      obj.push(user);
      localStorage.setItem('users', JSON.stringify(obj));
    }

    for (const key in obj) {
      if (obj[key]['isCurrent'] === true) {
        this.subscriberUser.next(obj[key]);
      }
    }
  }

  current() {
    this.addUser();
    return this.subscriberUser.asObservable();
  }
}
