import { Component } from '@angular/core';
import { SPINNER } from 'ngx-ui-loader';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  fgsType = SPINNER.squareJellyBox;
  
  constructor() {
  }
}
