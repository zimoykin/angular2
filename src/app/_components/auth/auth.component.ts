import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Auth } from '../../_dto/Auth';
import { UserAccess } from '../../_dto/UserAccess';
import { HttpService } from '../../_servises/http.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private http: HttpService) { }

  ngOnInit(): void { }

  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submit (email: string, password: string) { 

    if (email != '' && password != '') {
      const auth: Auth = { email: email, password: password } 
      this.http.post<Auth, UserAccess> ( 'api/login', auth )
      .then( val => {  
        localStorage.setItem('usr', JSON.stringify(val))
        window.location.href = ''
      })
      .catch( err => {
        console.log(err)
      })
    }

  }
}
