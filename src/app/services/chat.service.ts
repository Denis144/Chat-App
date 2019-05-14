import { Injectable } from '@angular/core';
import { MessagesService } from '../services/messages.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  timestamp: any;

  constructor(private messagesService: MessagesService ) {}

  sendMessage(userMessage: string, userName: string) {
    this.timestamp = this.getTimeStamp();

    this.messagesService.updateMessages({
      message: userMessage,
      timeSend: this.timestamp,
      userName: userName
    });
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
}
