import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { SocketMessage } from '../_dto/SocketsDTO/SocketMessage';
import { UserAccess } from '../_dto/UserAccess';
import { SocketUsersOnline } from '../_dto/SocketsDTO/SocketUserOnline';
import { Chat } from '../_dto/SocketsDTO/ChatMessage';

@Injectable({
  providedIn: "root",
})
export class IoService {

  private socket: SocketIOClient.Socket;
  usr: UserAccess = JSON.parse(localStorage.getItem("usr"));

  constructor() {}

  openSocket() {

    this.socket = io(environment.server, {
      query: {token: this.usr.accessToken},
    });
  }

  connect(): Observable<SocketUsersOnline> {

    if (!this.socket) this.openSocket()

    return new Observable((obser) => {
      this.socket.on( 'online', (data) => {
        obser.next(data);
      });
    });
  }

  openChat(user: string, myuser: string): Observable<Chat> {

    if (!this.socket) this.openSocket()

    this.socket.emit( 'chat', {user1: user, user2: myuser, message: 'start'})

    return new Observable((obser) => {
      this.socket.on( 'chat', (data) => {
        obser.next(data);
      })
    }) 
  }

  async send(topic: string, message: Chat) {
      if (this.socket.open) {
        this.socket.emit(topic, message) 
      }
  }
}