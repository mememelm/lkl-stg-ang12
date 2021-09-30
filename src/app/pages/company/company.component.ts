import { ControllerService } from './../../services/controller.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  constructor(public ctrl: ControllerService) { }

  ngOnInit(): void {
  }

  openAddCompany(): void {

  }

}
