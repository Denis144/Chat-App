import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';
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
  userName: string;
  messageContent: string;
  timeStamp: string;
  message: Array<ChatMessage>;
  currentUserId: any;
  flag: boolean = false;
 
  constructor(private chat: ChatService, public dialog: MatDialog, private route: ActivatedRoute) {}

  ngOnInit(chatMessage = this.chatMessage) {
    this.messageContent = chatMessage.message;
    this.timeStamp = chatMessage.timeSend;
    this.userName = chatMessage.userName;
    this.currentUserId = this.route.snapshot.paramMap.get('userId').slice(1);

    this.checkUser(this.currentUserId);
  }

  checkUser(id: any) {
    const obj = JSON.parse(localStorage.getItem('users'));
    if(obj[this.currentUserId]["userName"] === this.chatMessage.userName){
      this.flag = true; 
    }else {
      this.flag = false;
    }
  }

  deleteMsg() {
    const obj = JSON.parse(localStorage.getItem('messages'));

    for(var key in obj) {
      if(obj[key]["timeSend"] === this.chatMessage.timeSend) {
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
        if(mess.timeSend === this.chatMessage.timeSend) {
            mess.message = result || this.chatMessage.message;
          }
      });

      localStorage.setItem('messages', JSON.stringify(obj));
    });
  }
}
