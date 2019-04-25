import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss'],
  providers: [AuthService]
})
export class ChatHeaderComponent implements OnInit {
  label: string;
  @Input() currentUserId: any;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    const obj = JSON.parse(localStorage.getItem('users'));
    //this.currentUserId = this.route.snapshot.paramMap.get('userId').slice(1);
    this.label = obj[this.currentUserId]["userName"];
  }

  logout() {
    this.router.navigate(['']);
    this.label = '';
  }
}
