import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { Message } from '../_dto/SocketsDTO/ChatMessage';
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

  listenMessage(): Observable<Message> {

    if (!this.socket) this.openSocket()

    return new Observable(obser => {
      this.socket.on( 'message', (data) => {
        obser.next(data);
      });
    });

  }

  connect(): Observable<SocketUsersOnline> {

    if (!this.socket) this.openSocket()

    return new Observable(obser => {
      this.socket.on( 'online', (data) => {
        obser.next(data);
      });
    });
  }

}