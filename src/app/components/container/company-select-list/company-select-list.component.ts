import { EndPoints } from './../../../constants/classes/endpoints';
import { Company } from './../../../constants/models/company';
import { ControllerService } from './../../../services/controller.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-company-select-list',
  templateUrl: './company-select-list.component.html',
  styleUrls: ['./company-select-list.component.scss']
})
export class CompanySelectListComponent implements OnInit {

  @Input() parentForm!: FormGroup
  @Input() controlName: any
  listCompany: Company[] = []

  constructor(public ctrl: ControllerService) { }

  ngOnInit(): void {
    this.ctrl.api.get(EndPoints.COMPANY_GET).subscribe((company: Company[]) => {
      this.listCompany = company
    })
  }

}
