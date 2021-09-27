import { ControllerService } from './../../../services/controller.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/constants/models/user';

@Component({
  selector: 'app-head-bar',
  templateUrl: './head-bar.component.html',
  styleUrls: ['./head-bar.component.scss']
})
export class HeadBarComponent implements OnInit {

  @Output() emitSide = new EventEmitter<any>()
  @Input() toogle = true
  user!: User

  constructor(public ctrl: ControllerService) { }

  ngOnInit(): void {
    this.user = this.ctrl.storage.user()
  }

  showMenu() {
    this.emitSide.emit()
  }

}
