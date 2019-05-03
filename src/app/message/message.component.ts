import { Component, OnInit, Input } from '@angular/core';
import { MessagesService } from '../services/messages.service';
import { ChatMessage } from '../models/chat-message.model';

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
  isEdit = false;

  constructor(private messagesService: MessagesService) {}

  ngOnInit(chatMessage = this.chatMessage) {
    this.messageContent = chatMessage.message;
    this.timeStamp = chatMessage.timeSend;
    this.userName = chatMessage.userName;
    this.isEdit = this.messagesService.checkMess(this.chatMessage);
  }

  deleted() {
    this.messagesService.deleteMsg(this.chatMessage);
  }

  edited() {
    this.messagesService.editMsg(this.chatMessage);
  }
}
