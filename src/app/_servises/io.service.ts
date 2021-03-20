import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SocketMessage } from '../_dto/SocketsDTO/SocketMessage';
import { MessageType } from '../Enums/MessageType';
import { SocketID } from '../_dto/SocketsDTO/SocketID';
import { UserAccess } from '../_dto/UserAccess';

@Injectable({
  providedIn: "root",
})
export class IoService {

  private socket: SocketIOClient.Socket;
  private idClient: Subject<string> = new Subject()

  public usersOnline: Subject<string[]> = new BehaviorSubject<string[]>( undefined )
  public messages: Subject<SocketMessage[]> = new BehaviorSubject<SocketMessage[]>( undefined )

  constructor() {
    this.connect()
  }

  connect() {

    let usr: UserAccess = JSON.parse(localStorage.getItem( 'usr' ))

    this.socket = io(environment.server, {
      query: { token: usr.accessToken }
    });

    this.socket.on( 'connect', () => {
      console.log(this.socket.id);
      this.socket.emit('online')
    });

    this.socket.on( 'welcome', (data: string) => {
      if(!data) this.socket.close();
      this.idClient.next ( JSON.parse(data).id )
    })

    this.socket.on( 'online', (data) => {
      this.usersOnline.next ( data.users )
    });

    this.socket.on( 'messages', (data) => {
      this.messages.next ( data )
    });

  }


}

export const message = (id: string = '',text: string) : string => {
  return JSON.stringify(
    { clientid: id , message: text, type: MessageType.chatMessage}
  )
}