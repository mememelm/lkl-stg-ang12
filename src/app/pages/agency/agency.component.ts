import { ngIfAnimation } from './../../animations/ng-if-animation';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss'],
  animations: [ngIfAnimation]
})
export class AgencyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
