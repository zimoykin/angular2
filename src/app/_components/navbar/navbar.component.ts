import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserAccess } from 'src/app/_dto/UserAccess';
import { JwtService } from 'src/app/_servises/jwt.service';
import { environment } from 'src/environments/environment';
import { UserPublic } from '../../_dto/UserPublic';
import { HttpService } from '../../_servises/http.service';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  constructor(private http: HttpService, private jwt: JwtService) {}

  me$ = new Subject<UserPublic>();
  avatar$ = new Subject<string>()


  observer$ = {
    next: (value: UserPublic) => {
      this.avatar$.next(this.setMyPhoto(value.photo))
    },
    error: (error) => console.error(error),
    complete: () => console.log("completed"),
  };


  ngOnInit(): void {
    this.me$.subscribe(this.observer$)
    this.avatar$.next(this.setMyPhoto('nophoto.jpg'))
    this.setMe();
  }

  private async setMe() {
    let tokens = this.jwt.getAccess();
    console.log(`jwt: ${tokens.status}`)
    switch (tokens.status) {
      case "okay":
        this.me$.next(await this.http.get<UserPublic>(`api/user/${tokens.access.id}`));
        break;
      case "expired":
        this.http
          .post<any, UserAccess>("api/refresh", {
            refreshToken: tokens.access.refreshToken,
          })
          .then(async (val) => {
            this.jwt.saveMe(val);
            this.me$.next(await this.http.get<UserPublic>(`api/user/${val.id}`))
          })
          .catch((err) => console.log(err));
        break;
      case "unauthorized":
        if (location.pathname !== "/auth") location.href = "/auth";
        break;
    }
  }

  setMyPhoto(image: string):string{   
    return environment.server + "photos/" + image
  }

  handleFileInput($file: File) {
    const formData: FormData = new FormData();
    formData.append("file", $file[0], $file[0].name);

    this.http
      .post<any, any>("api/user/avatar", formData)
      .then(() => this.setMe())
      .catch((err) => console.log(err));
  }
}
