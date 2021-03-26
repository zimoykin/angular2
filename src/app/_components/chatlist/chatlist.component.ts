import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Chat } from 'src/app/_dto/SocketsDTO/ChatMessage';
import { HttpService } from 'src/app/_servises/http.service';



@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.component.html',
  styleUrls: ['./chatlist.component.scss']
})

export class ChatlistComponent implements OnInit {

  @Input() chaitid$: Subject<string>

  chats$: Subject<Chat[]> = new BehaviorSubject<Chat[]> (undefined)

  constructor( private httpservice: HttpService) { }

  ngOnInit(): void {

    this.httpservice.get<Chat[]>( 'api/chat')
    .then( uchats => {
      this.chats$.next(uchats)
      console.log(uchats)
    })
    .catch( err => {
      console.log(err)
    })

    this.chats$.pipe( 
      map ( val => {
        console.log(val)
      })
    ).subscribe()
  }

  selectChat(id:string) {
    this.chaitid$.next(id)
  }

}
