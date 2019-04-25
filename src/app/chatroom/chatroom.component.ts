import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';


@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss'],
  providers: [ChatService]
})
export class ChatroomComponent {
  userId: any;

  constructor(route: ActivatedRoute, chatService: ChatService) { 
    const el = route.snapshot.params['userId'];
    chatService.userId = parseInt(el.match(/\d+/));
    this.userId = chatService.userId;
  }
}
