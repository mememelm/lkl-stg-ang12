import { Company } from './../../../constants/models/company';
import { Agency } from './../../../constants/models/agency';
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
  agency!: Agency
  company!: Company

  constructor(public ctrl: ControllerService) { }

  ngOnInit(): void {
    this.user = this.ctrl.storage.user()
    this.agency = this.ctrl.storage.agency()
    this.company = this.ctrl.storage.company()
  }

  showMenu() {
    this.emitSide.emit()
  }

}
