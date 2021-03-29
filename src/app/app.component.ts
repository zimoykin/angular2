import { Component } from '@angular/core';
import { UserPublic } from './_dto/UserPublic';
import { HttpService } from './_servises/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '2clinic';
}
