import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {

  @ViewChild('drawer') drawer: any
  showFiller = false

  constructor() { }

  ngOnInit(): void {
  }

  toogleMenu() {
    this.drawer.toggle()
  }

}
