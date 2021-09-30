import { ngIfAnimation } from './../../../../animations/ng-if-animation';
import { Company } from './../../../../constants/models/company';
import { EndPoints } from './../../../../constants/classes/endpoints';
import { FormGroup, Validators } from '@angular/forms';
import { Agency } from './../../../../constants/models/agency';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ControllerService } from './../../../../services/controller.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

export interface DialogDetail {
  id: number
  agency: Agency
}
@Component({
  selector: 'app-agency-details',
  templateUrl: './agency-details.component.html',
  styleUrls: ['./agency-details.component.scss'],
  animations: [ngIfAnimation]
})
export class AgencyDetailsComponent implements OnInit {

  @ViewChild('accordion', { static: true }) accordion!: MatAccordion
  agencyForm!: FormGroup
  listCompany: Company[] = []

  constructor(
    public ctrl: ControllerService,
    @Inject(MAT_DIALOG_DATA) public data: DialogDetail,
    private dialogRef: MatDialogRef<AgencyDetailsComponent>
  ) { }

  ngOnInit(): void {
    this.agencyForm = this.ctrl.fb.group({
      name: [this.data.agency.name, [Validators.required, Validators.minLength(2)]],
      address: [this.data.agency.address, [Validators.required, Validators.minLength(4)]]
    })
    this.listCompany = this.data.agency.companies
    this.accordion.openAll()
  }

  updateAgency() {
    this.ctrl.api.put(EndPoints.AGENCY_UPDATE, this.data.id, this.agencyForm.value).subscribe(res => {
      if (res.success) {
        this.ctrl.alert.open("L'agence n'est plus dans la base de données. Veuillez actualiser la page actuelle")
      } else {
        this.ctrl.storage.setAction()
        this.ctrl.alert.updateDone()
        this.dialogRef.close()
      }
    })
  }

}
