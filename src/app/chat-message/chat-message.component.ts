import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../_dto/SocketsDTO/ChatMessage';
import { UserAccess } from '../_dto/UserAccess';
import { UserPublic } from '../_dto/UserPublic';
import { HttpService } from '../_servises/http.service';

@Component({
  selector: 'app-chan-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {

  constructor(private http:HttpService) { }

  @Input()
  message: Message
  user: UserPublic

  ngOnInit(): void {

    this.http.get<UserPublic>( `/api/user/${this.message.user}` )
    .then ( usr => {
      this.user = usr
    })

  }

}
