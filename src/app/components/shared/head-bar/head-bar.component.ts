import { ControllerService } from './../../../services/controller.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-head-bar',
  templateUrl: './head-bar.component.html',
  styleUrls: ['./head-bar.component.scss']
})
export class HeadBarComponent implements OnInit {

  @Output() emitSide = new EventEmitter<any>()
  @Input() toogle = true
  currentUser: any

  constructor(public ctrl: ControllerService) { }

  ngOnInit(): void {
    this.currentUser = this.ctrl.storage.user()
  }

  showMenu() {
    this.emitSide.emit()
  }

}
