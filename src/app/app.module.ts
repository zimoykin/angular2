import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnectComponent } from './connect/connect.component';
import { HomeComponent } from './_components/home/home.component';
import { AuthComponent } from './_components/auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { ChatMessageComponent } from './_components/chat-message/chat-message.component';
import { ChatComponent } from './_components/chat/chat.component';
import { ChatlistComponent } from './_components/chatlist/chatlist.component';
import { NavbarComponent } from './_components/navbar/navbar.component';
import { NotimplementedComponent } from './_components/notimplemented/notimplemented.component';
import { NewchatComponent } from './_components/newchat/newchat.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

const modules = [
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
  BrowserAnimationsModule,
]

const material = [
  MatInputModule,
  MatAutocompleteModule,
  MatButtonModule
];


@NgModule({
  declarations: [
    AppComponent,
    ConnectComponent,
    HomeComponent,
    AuthComponent,
    ChatMessageComponent,
    ChatComponent,
    ChatlistComponent,
    NavbarComponent,
    NotimplementedComponent,
    NewchatComponent
  ],
  imports: [modules, material],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
