import { ControllerService } from './../../../services/controller.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {

  @ViewChild('drawer') drawer: any
  toogle = true
  page!: string

  constructor(public ctrl: ControllerService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.toogleMenu()
    }, 500)
    this.page = 'dashboard'
  }

  toogleMenu() {
    this.drawer.toggle()
    this.toogle ? this.toogle = false : this.toogle = true
  }

  select($event: string) {
    this.page = $event
  }

}
