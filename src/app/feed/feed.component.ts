import { Component, DoCheck, AfterViewChecked } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { ChatMessage } from '../models/chat-message.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements DoCheck, AfterViewChecked {
  feed: Array<ChatMessage>;

  constructor(private chat: ChatService) { }

  ngDoCheck() {
    this.feed = this.chat.getMessages();
  }

  ngAfterViewChecked() {
    this.autoScroll();
  }

  autoScroll() {
    const element = document.querySelector('.feed');
    element.scrollIntoView({block: "end", behavior: "smooth"});
  }
}
