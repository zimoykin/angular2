import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, observable, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Chat, Message } from '../_dto/SocketsDTO/ChatMessage';
import { SocketMessage } from '../_dto/SocketsDTO/SocketMessage';
import { UserAccess } from '../_dto/UserAccess';
import { UserPublic } from '../_dto/UserPublic';
import { HttpService } from '../_servises/http.service';
import { IoService } from '../_servises/io.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpService, private io: IoService) {}

  users$ = new Subject<[UserPublic]>()
  online = new Array<string> ()
  me: UserAccess
  to: string
  selectedChat$: Observable<string>

  messages$ = new Array<Message>()

  observer$ = {
    next: value => { 
      this.to = value
      this.messages$ = []
      this.startChat(value)
    },
    error: error => console.error(error),
    complete: () => console.log("completed")
}

  ngOnInit() : void {

    if (!localStorage.getItem("usr")) {
      window.location.href = "/auth";
    } else {
      this.me = JSON.parse(localStorage.getItem("usr"))
      this.getUsers()
    }

    this.io.connect()
    .subscribe( 
      result => {
        this.online = result.users
      },
      err => console.log(err),
      () => {console.log('ws done')}
      )
    
  }

  getUsers() {
    this.http.get<[UserPublic]>( '/api/user' )
    .then ( users => {
      this.users$.next(users)
    })
    .catch ( err => {
      console.log(err)
    })
  }

  selectedChat(user: string) {

    this.selectedChat$ = new Observable( observer => {
      observer.next(user);
    })
    this.selectedChat$.subscribe(this.observer$)

  }

  startChat(user:string) {
     this.io.openChat( user, this.me.id)
     .subscribe( (result) => {
      console.log(result)
      if (result.message) this.messages$.push(result.message)
     })
  }

  isOnline (clientid: string) : boolean {
    if(!this.online) return false
    return (this.online.filter( val => { return val == clientid }).length != 0)
  }

  sendMessage(message:string) {

    const chat: Chat = { 
      user1: this.me.id,
      user2: this.to,
      message: { 
        user: this.me.id,
        date: new Date(),
        message: message
      }
    }
    this.io.send( 'chat', chat)
  }


}
