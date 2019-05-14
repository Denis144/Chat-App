import { Component, OnInit, Input } from '@angular/core';
import { MessagesService } from '../services/messages.service';
import { ChatMessage } from '../models/chat-message.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() chatMessage: ChatMessage;
  userName: string;
  messageContent: string;
  timeStamp: string;
  isEdit$: Observable<boolean>;

  constructor(private messagesService: MessagesService) {}

  ngOnInit(chatMessage = this.chatMessage) {
    this.messageContent = chatMessage.message;
    this.timeStamp = chatMessage.timeSend;
    this.userName = chatMessage.userName;
    this.isEdit$ = this.messagesService.checkMessage(this.chatMessage);
  }

  deleted() {
    this.messagesService.deleteMessage(this.chatMessage);
  }

  edited() {
    this.messagesService.editMessage(this.chatMessage);
  }
}
