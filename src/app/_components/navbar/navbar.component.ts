import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../_servises/http.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private http: HttpService) { }

  ngOnInit(): void { }

  handleFileInput($file: File) {

    const formData: FormData = new FormData();
    formData.append('fileKey', $file[0], $file[0].name);

    this.http.post<any, any>('api/user/avatar', formData)
    .then( val => {} )
    .catch( err => console.log(err) )

  }

}
