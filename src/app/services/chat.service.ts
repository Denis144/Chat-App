import { Injectable } from '@angular/core';
import { ChatMessage } from '../models/chat-message.model';
import { UsersService } from '../services/users.service';
import { MessagesService } from '../services/messages.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  userName: string;
  currentUser: any;
  timestamp: any;
  editMsg: string;
  subscription: Subscription;

  constructor(private usersService: UsersService, private messagesService: MessagesService ) {
    if (!localStorage.getItem('messages')) {
      localStorage.setItem('messages', JSON.stringify(new Array<ChatMessage>()));
    }
    const userObservable = this.usersService.current();  
    this.subscription = userObservable.subscribe(user => { this.currentUser = user; });
  }

  sendMessage(msg: string) {
    this.timestamp = this.getTimeStamp();
    this.userName = this.getUserName();

    this.messagesService.updateMessages({
      message: msg,
      timeSend: this.timestamp,
      userName: this.userName
    });
  }

  getUserName() {
    return this.currentUser["userName"];
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getFullYear() + '/' +
                 (now.getMonth() + 1) + '/' +
                 now.getDay();
    const time = now.getHours() + ':' +
                 now.getMinutes() + ':' +
                 now.getSeconds();
    return (date + ' ' + time);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
