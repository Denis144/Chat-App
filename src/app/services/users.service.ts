import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  currentUser = new BehaviorSubject<any>('');

  constructor() {}

  addUser(): void {
    const obj = JSON.parse(localStorage.getItem('users'));

    for (const key in obj) {
      if (obj[key]['isCurrent'] === true) {
        this.currentUser.next(obj[key]);
      }
    }
  }

  current() {
    this.addUser(); // добавить аргументы и в зависисмоти от наличия или отсутствия вызывать localStorage
    return this.currentUser.asObservable();
  }
}
