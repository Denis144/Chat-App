import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChatMessage } from '../models/chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  subscriberMess = new BehaviorSubject<any>(new ChatMessage());

  constructor() {}

  updateMessages(): void {
    const obj = JSON.parse(localStorage.getItem('messages'));
    console.log(obj);
    this.subscriberMess.next(obj);
  }

  getMessages() {
    this.updateMessages();
    return this.subscriberMess.asObservable();
  }
}
// Сделать set и get localeStorage!!!