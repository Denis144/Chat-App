import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent {
  formModel: FormGroup;

  constructor(private authService: AuthService, private router: Router, fb: FormBuilder) {
    fb = new FormBuilder();
    this.formModel = fb.group({
    'userName': ['', [authService.userNameValidator]]
    });
  }

  submit() {
    if (this.formModel.valid) {
      const { userName } = this.formModel.value;
      this.authService.signUp(userName);
      this.router.navigate(['chat']);
    }
  }
}
