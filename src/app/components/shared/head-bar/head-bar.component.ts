import { ControllerService } from './../../../services/controller.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-head-bar',
  templateUrl: './head-bar.component.html',
  styleUrls: ['./head-bar.component.scss']
})
export class HeadBarComponent implements OnInit {

  currentUser: any

  constructor(public ctrl: ControllerService) { }

  ngOnInit(): void {
    this.currentUser = this.ctrl.storage.getLocalObject('CURRENT_USER')
  }

}
