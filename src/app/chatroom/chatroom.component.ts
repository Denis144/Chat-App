import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss'],
  providers: [UsersService]
})
export class ChatroomComponent {
  currentUser$: Observable<User>;

  constructor(private usersService: UsersService) {
    this.currentUser$ = this.usersService.current();
  }
}
