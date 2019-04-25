import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent {
  formModel: FormGroup;
  userId: any;
  errorMsg: string;

  constructor(private authService: AuthService, private router: Router, fb: FormBuilder) { 
    fb = new FormBuilder();
    this.formModel = fb.group({
    'userName': ['', [this.userNameValidator]]
    })
  }

  userNameValidator(control: FormControl): any {
    if(!control.value) return null;
    const valid = control.value.match(/^[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{0,}\s[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{1,}(\s[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{1,})?$/);
    return valid ? null : { userNameValidator: true }; 
  }

  signUp() {
    if(this.formModel.valid) {
      const displayName = this.formModel.value["userName"];
      this.userId = this.authService.signUp(displayName)

      if(this.userId) {
        this.router.navigate(['chat', `:${this.userId}`]);

      }
    }
  }
}
