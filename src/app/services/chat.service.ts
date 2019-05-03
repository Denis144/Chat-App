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
  chatMessages: Array<ChatMessage> = new Array<ChatMessage>();
  editMsg: string;
  subscription: Subscription;

  constructor(private usersService: UsersService, private messagesService: MessagesService ) {
    const userObservable = this.usersService.current();  
    this.subscription = userObservable.subscribe(user => { this.currentUser = user; });
  }

  sendMessage(msg: string) {

    if (!localStorage.getItem('messages')) {
      localStorage.setItem('messages', JSON.stringify(this.chatMessages));
    }

    this.timestamp = this.getTimeStamp();
    this.userName = this.getUserName();

    this.chatMessages = this.getMessages();

    this.chatMessages.push({
      message: msg,
      timeSend: this.timestamp,
      userName: this.userName
    });

    localStorage.setItem('messages', JSON.stringify(this.chatMessages));
  }

  getUserName() {
    return this.currentUser["userName"];
  }

  getMessages(): Array<ChatMessage> {
    return JSON.parse(localStorage.getItem('messages')); // берем с Locale Storage
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
