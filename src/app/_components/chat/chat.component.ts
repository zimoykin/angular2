import { Component, Input, OnInit } from "@angular/core";
import { Chat, Message } from "src/app/_dto/SocketsDTO/ChatMessage";
import { UserPublic } from "src/app/_dto/UserPublic";
import { HttpService } from "src/app/_servises/http.service";
import { IoService } from "src/app/_servises/io.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit {
  constructor(private http: HttpService, private io: IoService) {}

  messages$ = new Array<Message>();
  @Input() chat: string;
  members = new Array<UserPublic>();

  ngOnInit(): void {
    //getMessages()
    //connectToChat()
  }

  connectToChat() {
    // this.io.openChat().subscribe((result) => {
    //   console.log(result);
    //   if (result.message) this.messages$.push(result.message);
    // });
  }

}
