import { Component, DoCheck, AfterViewChecked, Input } from '@angular/core';
import { ChatMessage } from '../models/chat-message.model';
import { MessagesService } from '../services/messages.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements AfterViewChecked, DoCheck {
  feed$: Observable<ChatMessage[]>;

  constructor(private messagesService: MessagesService) {
    this.feed$ = this.messagesService.getMessages();
  }

  ngDoCheck() {
    this.messagesService.updateMessages();
  }

  ngAfterViewChecked() {
    this.autoScroll();
  }

  autoScroll() {
    const element = document.querySelector('.feed');
    if (element) {
      element.scrollIntoView({block: 'end', behavior: 'smooth'});
    }
  }
}
