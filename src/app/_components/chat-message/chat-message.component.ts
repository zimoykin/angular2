import { Component, Input, OnInit } from "@angular/core";
import { of, Subject } from "rxjs";
import { UserPublic } from "src/app/_dto/UserPublic";
import { Chat, Message, NewMessage } from "../../_dto/SocketsDTO/ChatMessage";
import { HttpService } from "../../_servises/http.service";

@Component({
  selector: "app-chat-message",
  templateUrl: "./chat-message.component.html",
  styleUrls: ["./chat-message.component.scss"],
})
export class ChatMessageComponent implements OnInit {
  constructor(private http: HttpService) {}

  @Input() chaitid$: Subject<string>;
  messages$: Subject<Message[]> = new Subject<Message[]>()

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

  ngOnInit(): void {
    this.chaitid$.subscribe(this.observer$);
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

  getChat( chatid: string ):Promise<void> {
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


  sendMessage (message: string) {
   
    this.http.post<NewMessage, Message> ('api/message', {
      chat: this.currentChat.id,
      user: this.me,
      message: message
    })
    .then ( () => this.getMessages(this.currentChat.id))
    .catch ( err => console.log(err))

  }

}
