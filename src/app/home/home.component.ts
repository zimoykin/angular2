import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
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


  isOnline (clientid: string) : boolean {
    if(!this.online) return false
    return (this.online.filter( val => { return val == clientid }).length != 0)
  }
}
