import { Component} from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent{
  message: string;

  constructor(private chatService: ChatService) {}

  send() {
    if (this.message.trim()) {
      this.chatService.sendMessage(this.message);
      this.message = '';
    }
  }

  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.send();
    }
  }
}
