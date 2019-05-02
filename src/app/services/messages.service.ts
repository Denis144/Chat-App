import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ChatMessage } from '../models/chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  subscriberMess = new Subject<ChatMessage>();

  constructor() {}

  addMessages(mess: any): void {
    this.subscriberMess.next(mess);
  }

  getMessages() {
    return this.subscriberMess.asObservable();
  }
}
