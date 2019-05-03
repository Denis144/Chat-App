import { Component, DoCheck, AfterViewChecked, Input } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { ChatMessage } from '../models/chat-message.model';
import { MessagesService } from '../services/messages.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements AfterViewChecked, DoCheck {
  feed: Array<ChatMessage> = new Array<ChatMessage>();
  subscription: Subscription;

  constructor(private chatService: ChatService, private messagesService: MessagesService) {}

  ngDoCheck() {
      this.subscription = this.messagesService.getMessages().subscribe(messages => { 
      this.feed = messages.concat();
    });
  }

  ngAfterViewChecked() {
    this.autoScroll();
  }

  autoScroll() {
    const element = document.querySelector('.feed');
    element.scrollIntoView({block: 'end', behavior: 'smooth'});
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
