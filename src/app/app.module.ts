import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnectComponent } from './connect/connect.component';
import { HomeComponent } from './_components/home/home.component';
import { AuthComponent } from './_components/auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule } from 'ngx-socket-io';
import { ChatMessageComponent } from './_components/chat-message/chat-message.component';
import { ChatComponent } from './_components/chat/chat.component';
import { ChatlistComponent } from './_components/chatlist/chatlist.component';
import { NavbarComponent } from './_components/navbar/navbar.component';
import { NotimplementedComponent } from './_components/notimplemented/notimplemented.component';

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
    NotimplementedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
