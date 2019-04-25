import { Injectable } from '@angular/core';
import { ChatMessage } from '../models/chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  userName: string;
  userId: any;
  timestamp: any;
  chatMessages: Array<ChatMessage> = new Array<ChatMessage>();
  editMsg: string;

  constructor() {}

  sendMessage(msg: string) {
    if(!localStorage.getItem('messages')) {
      localStorage.setItem('messages', JSON.stringify(this.chatMessages));
    }

    this.timestamp = this.getTimeStamp();
    this.userName = this.getUserName(this.userId);
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message: msg,
      timeSend: this.timestamp,
      userName: this.userName
    });
    localStorage.setItem('messages', JSON.stringify(this.chatMessages));
  }

  getUserName(id: any) {
    const obj = JSON.parse(localStorage.getItem('users'));
    return obj[id]['userName'];
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
    console.log(date + ' ' + time);
    return (date + ' ' + time);
  }
}
