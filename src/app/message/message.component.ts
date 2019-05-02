import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { UsersService } from '../services/users.service';
import { ChatMessage } from '../models/chat-message.model';
import { EditMessageComponent } from '../edit-message/edit-message.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() chatMessage: ChatMessage;
  currentUser: any;
  userName: string;
  messageContent: string;
  timeStamp: string;
  message: Array<ChatMessage>;
  flag = false;

  constructor(private chat: ChatService, private usersService: UsersService, public dialog: MatDialog, private route: ActivatedRoute) {}

  ngOnInit(chatMessage = this.chatMessage) {
    this.messageContent = chatMessage.message;
    this.timeStamp = chatMessage.timeSend;
    this.userName = chatMessage.userName;
    this.checkUser();
  }

  checkUser() {
    const observable = this.usersService.current();  
    observable.subscribe(user => { this.currentUser = user; });
    if (this.currentUser["userName"] === this.chatMessage.userName) {
      this.flag = true;
    } else {
      this.flag = false;
    }
  }

  deleteMsg() {
    const obj = JSON.parse(localStorage.getItem('messages'));

    for (const key in obj) {
      if (obj[key]['timeSend'] === this.chatMessage.timeSend) {
        obj.splice(key, 1);
        localStorage.setItem('messages', JSON.stringify(obj));
      }
    }
  }

  editMsg() {
    const dialogRef = this.dialog.open(EditMessageComponent, {
      width: '400px',
      data: {name: this.chatMessage.userName, time: this.chatMessage.timeSend, message: this.chatMessage.message }
    });

    dialogRef.afterClosed().subscribe(result => {
      const obj = JSON.parse(localStorage.getItem('messages'));

      obj.find(mess => {
        if (mess.timeSend === this.chatMessage.timeSend) {
            mess.message = result || this.chatMessage.message;
          }
      });

      localStorage.setItem('messages', JSON.stringify(obj));
    });
  }
}
