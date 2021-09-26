import { AutoLogoutService } from './services/auto-logout.service';
import { Component } from '@angular/core';
import { slideAnimation } from './animations/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideAnimation]
})
export class AppComponent {

  title = 'e-voyage12'

  constructor(private _: AutoLogoutService) { }

  routeOutlet(outlet: any) {
    return (outlet && outlet.activatedRouteData && outlet.activatedRouteData["animation"])
  }

}
