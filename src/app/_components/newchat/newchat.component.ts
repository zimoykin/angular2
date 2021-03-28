import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable, Subject } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { Chat, ChatPublic } from "../../_dto/SocketsDTO/ChatMessage";
import { UserPublic } from "../../_dto/UserPublic";
import { HttpService } from "../../_servises/http.service";

@Component({
  selector: "app-newchat",
  templateUrl: "./newchat.component.html",
  styleUrls: ["./newchat.component.scss"],
})
export class NewchatComponent implements OnInit {
  @Input() visible = new Subject<boolean>();
  @Input() me: string;
  selectedUser: string;
  myControl = new FormControl();
  options: UserPublic[];
  filteredOptions: Observable<UserPublic[]>;

  constructor(private http: HttpService) {}

  ngOnInit() {
    this.http
      .get<UserPublic[]>("api/user")
      .then((users) => (this.options = users.filter( val => {return val.id !== this.me})))
      .catch((err) => console.log(err));

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value) => (typeof value === "string" ? value : value.name)),
      map((name) => (name ? this._filter(name) : this.options.slice()))
    );
  }

  setSelected($event){
    console.log($event)
    if ($event) {
      this.selectedUser = $event.id;
    }
  }

  startChat() {
    if (this.selectedUser) {
    this.http
      .post<any, ChatPublic>("api/chat", {
        title: "",
        settings: {
          isSoundOn: false,
          isNotifyOn: false,
        },
        users: [this.selectedUser, this.me],
      })
      .then((chat) => {
        this.visible.next(false);
      })
      .catch((err) => console.log(err));
    }
  }

  displayFn(user: UserPublic): string {
    return user && user.username ? user.username : "";
  }

  private _filter(name: string): UserPublic[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(
      (option) => option.username.toLowerCase().indexOf(filterValue) === 0
    );
  }

  toogle(value: boolean) {
    this.visible.next(value);
  }
}
