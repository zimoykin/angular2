import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { Codable } from "../_internal/Codable";
import { JwtService } from "./jwt.service";


@Injectable({
  providedIn: "root",
})
export class HttpService {
  private server = environment.server;
  constructor(private http: HttpClient, private jwt: JwtService) {}

  private jwtHeader(): HttpHeaders {
    if (this.jwt.access) {
      return new HttpHeaders({
        Authorization: "Bearer " + this.jwt.access.accessToken,
      });
    } else {
      return new HttpHeaders({ });  
    }
  }

  post<T extends Codable, R extends Codable>(
    path: string,
    body?: T,
    file?: FormData
  ): Promise<R> {
    let url = this.server + path;
    console.log("post " + url);

    return new Promise((resolve, reject) => {
      let timeout = setTimeout(() => {
        reject(new Error("timeout"));
      }, 5000);

      this.http
        .post<R>(url, body != null ? body : file, {
          headers: this.jwtHeader(),
          observe: "response",
        })
        .pipe(
          map((response) => {
            clearTimeout(timeout);
            resolve(response.body);
          })
        )
        .subscribe();
    });
  }

  get<T extends Codable>(
    path: string,
    params?: Map<string, string>,
    auth: boolean = true
  ): Promise<T> {
    let url = this.server + path;
    console.log("get " + url);

    //params
    if (params) {
      url += "?";
      params.forEach((val, key) => {
        url += key;
        url += `=${val}&`;
      });
    }

    return new Promise((resolve, reject) => {
      let timeout = setTimeout(() => {
        reject(new Error("timeout"));
      }, 10000);

      this.http
        .get<T>(url, {
          headers: this.jwtHeader(),
          observe: "response",
        })
        .subscribe(
          (res) => resolve(res.body),
          (err) => reject(err),
          () => console.log("HTTP request completed.")
        );
    });
  }
}
