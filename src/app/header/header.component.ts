import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [AuthService]
})
export class HeaderComponent implements OnInit {
  label: string;

  constructor(private router: Router, private authService: AuthService) {
    
  }

  ngOnInit() {}

  logout() {
    this.router.navigate(['']);
    this.label = '';
  }

}
