import { FormGroup } from '@angular/forms';
import { EndPoints } from './../../../constants/classes/endpoints';
import { ControllerService } from './../../../services/controller.service';
import { Agency } from './../../../constants/models/agency';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-agency-select-list',
  templateUrl: './agency-select-list.component.html',
  styleUrls: ['./agency-select-list.component.scss']
})
export class AgencySelectListComponent implements OnInit {

  @Input() parentForm!: FormGroup
  @Input() controlName: any
  listAgency: Agency[] = []

  constructor(public ctrl: ControllerService) { }

  ngOnInit(): void {
    this.ctrl.api.get(EndPoints.AGENCY_GET).subscribe((agency: Agency[]) => {
      this.listAgency = agency
    })
  }

}
