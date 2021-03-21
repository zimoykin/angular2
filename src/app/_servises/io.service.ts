import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { observable, Observable, Subject } from 'rxjs';
import { SocketMessage } from '../_dto/SocketsDTO/SocketMessage';
import { MessageType } from '../Enums/MessageType';
import { SocketID } from '../_dto/SocketsDTO/SocketID';
import { UserAccess } from '../_dto/UserAccess';
import { SocketUsersOnline } from '../_dto/SocketsDTO/SocketUserOnline';

@Injectable({
  providedIn: "root",
})
export class IoService {

  private socket: SocketIOClient.Socket;
  private idClient: Subject<string> = new Subject()


  constructor() {}

  connect() : Observable<SocketUsersOnline> {

    let usr: UserAccess = JSON.parse(localStorage.getItem( 'usr' ))

    this.socket = io(environment.server, {
      query: { token: usr.accessToken }
    });

    return new Observable ( obser => {
      this.socket.on( 'online', (data) => {
        obser.next( data )
      })
    })

  }


}