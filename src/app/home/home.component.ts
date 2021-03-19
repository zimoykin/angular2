import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserPublic } from '../_dto/UserPublic';
import { HttpService } from '../_servises/http.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpService) {}

  users$: Subject<[UserPublic]> = new BehaviorSubject ( undefined )

  ngOnInit() : void {

    if (!localStorage.getItem("usr")) {
      window.location.href = "/auth";
    }

    this.http.get<[UserPublic]>( '/api/user' )
    .then ( users => {
      this.users$.next(users)
    })
    .catch ( err => {
      console.log(err)
    })
    
  }
}
