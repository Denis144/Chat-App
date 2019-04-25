import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './header/header.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { FeedComponent } from './feed/feed.component';
import { ChatFormComponent } from './chat-form/chat-form.component';
import { MessageComponent } from './message/message.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { EditMessageComponent } from './edit-message/edit-message.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ChatroomComponent,
    FeedComponent,
    ChatFormComponent,
    MessageComponent,
    SignupFormComponent,
    EditMessageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [EditMessageComponent]
})
export class AppModule { }
