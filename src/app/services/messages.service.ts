import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';
import { ChatMessage } from '../models/chat-message.model';
import { UsersService } from '../services/users.service';
import { EditMessageComponent } from '../edit-message/edit-message.component';
import { MatDialog } from '@angular/material';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessagesService implements OnDestroy {
  $messages = new Subject<ChatMessage[]>();
  subscription: Subscription;

  constructor(private usersService: UsersService, public dialog: MatDialog) {
    if (!JSON.parse(localStorage.getItem('messages'))) {
      localStorage.setItem('messages', JSON.stringify(new Array<ChatMessage>()));
    }
    this.subscription = this.$messages.subscribe(messages => localStorage.setItem('messages', JSON.stringify(messages)));
  }

  updateMessages(mess?: ChatMessage): void {
    const messages = JSON.parse(localStorage.getItem('messages'));
    if (mess) {
      messages.push(mess);
    }
    this.$messages.next(messages);
  }

  getMessages() {
    return this.$messages.asObservable();
  }

  checkMessage({ userName: currentUserName }): Observable<boolean> {
    return this.usersService.current().pipe(take(1), map(({ userName }) => userName === currentUserName));
  }

  deleteMessage({ timeSend: currentTimeSend }) {
    const messages = JSON.parse(localStorage.getItem('messages'));
    const key = messages.findIndex(({ timeSend }) => timeSend === currentTimeSend);
    messages.splice(key, 1);
    this.$messages.next(messages);
  }

  editMessage({ userName: currentUserName, timeSend: currentTime, message: currentMessage }) {
    const dialogRef = this.dialog.open(EditMessageComponent, {
      width: '400px',
      data: { name: currentUserName, time: currentTime, message: currentMessage }
    });

    dialogRef.afterClosed().subscribe(result => {
      const messages = JSON.parse(localStorage.getItem('messages'));
      const currentMess = messages.find(({ timeSend }) => timeSend === currentTime);

      currentMess.message = result || currentMessage;
      this.$messages.next(messages);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
