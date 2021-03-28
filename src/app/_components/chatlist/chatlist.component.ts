import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
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
  @Input() me: string
  @Output() message$ = new EventEmitter<Message>();
  chats$ = new BehaviorSubject<Chat[]> ([])

  newchatvisible = new Subject<boolean>()

  constructor(
    private httpservice: HttpService,
    private io: IoService
  ) {}

  ngOnInit(): void {

    this.httpservice.get<Chat[]>('api/chat')
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

  getChatTitle (id:string): string {

   let filtred = this.chats$.getValue().filter( val => {
      return val.id === id
    })

    if (filtred.length === 1 && filtred[0].users.length ===2) {
        return filtred[0].users.filter( user => { 
          return user.id !== this.me })[0].username
        } 
    else { 
      return filtred[0].title
    }

  }

  createnew() {
    this.newchatvisible.next(true)
  }
}
