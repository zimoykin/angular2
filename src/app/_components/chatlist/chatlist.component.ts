import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Chat, Message } from '../../_dto/SocketsDTO/ChatMessage';
import { HttpService } from '../../_servises/http.service';
import { IoService } from '../../_servises/io.service';



@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.component.html',
  styleUrls: ['./chatlist.component.scss']
})

export class ChatlistComponent implements OnInit {

  @Input() chaitid$: Subject<string>
  @Output() message$ = new EventEmitter<Message>();
  chats$: Subject<Chat[]> = new BehaviorSubject<Chat[]> (undefined)


  constructor(
    private httpservice: HttpService,
    private io: IoService
  ) {}

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


    this.io.listenMessage()
    .subscribe( 
      result => {
        this.message$.emit(result);
        console.log(result)
      },
      err => console.log(err),
      () => {console.log('ws done')}
      )

  }

  selectChat(id:string) {
    this.chaitid$.next(id)
  }

}
