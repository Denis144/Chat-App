import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss'],
  providers: [AuthService, UsersService]
})
export class ChatHeaderComponent {
  label: string;
  currentUser: any;
  subscription: Subscription;

  constructor(private usersService: UsersService, private authService: AuthService) {
    const observable = this.usersService.current();  
    this.subscription = observable.subscribe(user => { this.currentUser = user; });
    this.label = this.currentUser["userName"];
  }

  logout() {
    this.authService.logout();
    this.label = '';
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
