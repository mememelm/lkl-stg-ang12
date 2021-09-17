import { AutoLogoutService } from './services/auto-logout.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'e-voyage12'

  constructor(private _: AutoLogoutService) { }

}
