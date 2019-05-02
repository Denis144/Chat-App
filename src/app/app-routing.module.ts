import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { ChatGuardService }   from './services/chat-guard.service';

const routes: Routes = [
  { path: '', component: SignupFormComponent },
  { path: 'chat', component: ChatroomComponent, canActivate: [ChatGuardService] },
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
