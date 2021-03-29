import { Injectable } from "@angular/core";
import { UserAccess } from "../_dto/UserAccess";
import { JwtHelperService as JWT } from "@auth0/angular-jwt";
import { HttpService } from "./http.service";
import { UserPublic } from "../_dto/UserPublic";

const jwt = new JWT();

@Injectable({
  providedIn: "root",
})
export class JwtService {
  access: UserAccess;

  constructor() {
    if (localStorage.getItem("usr")) {
      this.access = JSON.parse(localStorage.getItem("usr"));
    }
  }

  logout() {
    localStorage.removeItem("usr");
  }

  getAccess(): any {
    if (this.access) {
      return { 
        access: this.access, 
        status: (jwt.isTokenExpired(this.access.accessToken) ? 'expired' : 'okay')
      }
    } else {
     return {
      access: undefined, 
      status: 'unauthorized'
     }
    }
  }


  getMe (): UserAccess {
    const usr = localStorage.getItem('usr')
    if (usr) {
      const access = JSON.parse(usr)
      return access
    } else {
      return undefined
    }
  }

  saveMe(payload: UserAccess) {
    localStorage.setItem('usr', JSON.stringify(payload))
  }

  saveUser(userAccess: UserAccess) {
    localStorage.setItem("usr", JSON.stringify(userAccess));
  }
}
