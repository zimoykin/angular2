import { Component, Input, OnInit } from "@angular/core";
import { BehaviorSubject, of, Subject } from "rxjs";
import { UserPublic } from "src/app/_dto/UserPublic";
import { IoService } from "src/app/_servises/io.service";
import { Chat, Message, NewMessage } from "../../_dto/SocketsDTO/ChatMessage";
import { HttpService } from "../../_servises/http.service";

@Component({
  selector: "app-chat-message",
  templateUrl: "./chat-message.component.html",
  styleUrls: ["./chat-message.component.scss"],
})
export class ChatMessageComponent implements OnInit {
  constructor(private http: HttpService, private io: IoService) {}

  @Input() chaitid$: Subject<string>;
  @Input() message$: Subject<Message>;
  messages$ = new BehaviorSubject<Message[]>([])

  currentChat: Chat
  @Input() me: string

  observer$ = {
    next: (value: string) => {
      this.getChat(value).then( () => {
        this.getMessages(value)
      })
    },
    error: (error) => console.error(error),
    complete: () => console.log("completed"),
  };

  incoming$ = {
    next: (value: Message) => {
      if ( value.chat.id === this.currentChat.id) {
        this.messages$.next(this.messages$.getValue().concat([value]))
      } else {
        alert(value.user.username + ": " + value.message)
      }
    },
    error: (error) => console.error(error),
    complete: () => console.log("completed"),
  };

  ngOnInit(): void {
    this.chaitid$.subscribe(this.observer$);
    this.message$.subscribe(this.incoming$);
  }

  getMessages(chatid: string) {
    if (!chatid) throw Error('check chat id respone')
    const params = new Map([
      ['chat', chatid]
    ]);
    this.http.get<Message[]>('api/message', params, true)
    .then( val => {
      this.messages$.next(val)
    })
    .catch( err => {
      console.log(err)
    })
  }

  getChat(chatid: string):Promise<void> {
    return new Promise( (resolve, reject) => {
      this.http.get<Chat>(`api/chat/${chatid}`)
      .then( chat => {
        this.currentChat = chat
        resolve()
      })
      .catch( err => {
        console.log(err)
        reject()
      })
    })
  }

  presentChat():string {
    if (!this.currentChat) return
    return this.currentChat.users.map( val => { return val.username}).join( '/' )
  }
  
  sendMessage(message: string) {
   this.http.post<NewMessage, Message> ('api/message', {
      chatid: this.currentChat.id,
      message: message,
      type: 'chatMessage'
    })
    .then ( () => console.log('message sent'))
    .catch ( err => console.log(err))

  }

}
