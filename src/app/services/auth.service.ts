import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usersList: Array<User> = new Array<User>();
  userId: any;
  status: string = "new";

  constructor(private router: Router) {}

  signUp(displayName: string) {
    if(!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(this.usersList));
    }

    const obj = JSON.parse(localStorage.getItem('users'));
    for(var key in obj) {
      if(obj[key]["userName"] === displayName) {
        this.status = "old";
      }
    }
    
    if(this.status === "new") {
      this.usersList = this.getUsers();
      this.usersList.push({
        userName: displayName
      });
      localStorage.setItem('users', JSON.stringify(this.usersList));
      this.userId = this.getUserId(displayName);
      return this.userId;
    }
    else {
      this.userId = this.getUserId(displayName);
      return this.userId;
    }
  }

  getUsers(): Array<User> {
    return JSON.parse(localStorage.getItem('users'));
  }

  getUserId(username: string) {
    const obj = JSON.parse(localStorage.getItem('users'));
  
    for(var key in obj) {
      if(obj[key]["userName"] === username) {
        return key;
      }
    }
  }
}
