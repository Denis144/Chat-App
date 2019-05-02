import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss'],
  providers: [AuthService, UsersService]
})
export class ChatHeaderComponent {
  label: string;
  currentUser: any;

  constructor(private usersService: UsersService, private authService: AuthService) {
    const observable = this.usersService.current();  
    observable.subscribe(user => { this.currentUser = user; });
    this.label = this.currentUser["userName"];
  }

  logout() {
    this.authService.logout();
    this.label = '';
  }
}
