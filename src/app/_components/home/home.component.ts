import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, observable, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Chat, Message } from '../../_dto/SocketsDTO/ChatMessage';
import { SocketMessage } from '../../_dto/SocketsDTO/SocketMessage';
import { UserAccess } from '../../_dto/UserAccess';
import { UserPublic } from '../../_dto/UserPublic';
import { HttpService } from '../../_servises/http.service';
import { IoService } from '../../_servises/io.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {

  chaitid$: Subject<string> = new Subject<string>();
  me: string

  constructor(private http: HttpService, private io: IoService) {}

  ngOnInit() : void {

    if (!localStorage.getItem("usr")) {
      window.location.href = "/auth";
    } else {
      let me: UserPublic = JSON.parse(localStorage.getItem("usr")).id
    }
    
  }

}
