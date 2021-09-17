import { ControllerService } from './../../../services/controller.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-head-bar',
  templateUrl: './head-bar.component.html',
  styleUrls: ['./head-bar.component.scss']
})
export class HeadBarComponent implements OnInit {

  @Output() emitSide = new EventEmitter<any>()
  currentUser: any
  hideMenu = true

  constructor(public ctrl: ControllerService) { }

  ngOnInit(): void {
    this.currentUser = this.ctrl.storage.getLocalObject('CURRENT_USER')
  }

  showMenu() {
    this.emitSide.emit()
  }

}
