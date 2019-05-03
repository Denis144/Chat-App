import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChatMessage } from '../models/chat-message.model';
import { UsersService } from '../services/users.service';
import { EditMessageComponent } from '../edit-message/edit-message.component';
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  subscriberMess = new BehaviorSubject<any>(new ChatMessage());
  currentUser: any;

  constructor(private usersService: UsersService, public dialog: MatDialog) {}

  updateMessages(): void {
    const obj = JSON.parse(localStorage.getItem('messages'));
    this.subscriberMess.next(obj);
  }

  getMessages() {
    this.updateMessages();
    return this.subscriberMess.asObservable();
  }

  checkMess(mess) {
    const observable = this.usersService.current();  
    observable.subscribe(user => { this.currentUser = user; });
    if (this.currentUser["userName"] === mess.userName) {
      return true;
    } 
    return false;
  }

  deleteMsg(mess: ChatMessage) {
    const obj = JSON.parse(localStorage.getItem('messages'));

    for (const key in obj) {
      if (obj[key]['timeSend'] === mess.timeSend) {
        obj.splice(key, 1);
        localStorage.setItem('messages', JSON.stringify(obj));
      }
    }
  }

  editMsg(messList) {
    const dialogRef = this.dialog.open(EditMessageComponent, {
      width: '400px',
      data: {name: messList.userName, time: messList.timeSend, message: messList.message }
    });

    dialogRef.afterClosed().subscribe(result => {
      const obj = JSON.parse(localStorage.getItem('messages'));

      obj.find(mess => {
        if (mess.timeSend === messList.timeSend) {
          mess.message = result || messList.message;
        }
      });

      localStorage.setItem('messages', JSON.stringify(obj));
    });
  }

}
// Сделать set и get localeStorage!!!
