import { ControllerService } from './services/controller.service';
import { Component, OnInit } from '@angular/core';
import { EndPoints } from './routes/endpoints';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'e-voyage12'

  constructor(public ctrl: ControllerService) {
  }

  ngOnInit(): void {
    localStorage.setItem('INIT_TOKEN', '_I')
  }

  log() {
    this.ctrl.auth.login(EndPoints.AUTH, [
      ['grant_type', 'password'],
      ['username', 'admin.betax@yopmail.com'],
      ['password', 'admin{azerty@123!']
    ]).subscribe((res: any) => {
      console.log(res)
      localStorage.setItem('INIT_TOKEN', '_')
    })
  }
}
