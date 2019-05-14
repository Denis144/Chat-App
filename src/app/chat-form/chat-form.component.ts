import { Component, Input} from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent {
  @Input() currentUserName: string;
  message: string;

  constructor(private chatService: ChatService) {}

  send() {
    if (this.message.trim()) {
      this.chatService.sendMessage(this.message, this.currentUserName);
      this.message = '';
    }
  }

  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.send();
    }
  }
}
