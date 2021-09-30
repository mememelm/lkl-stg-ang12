import { ngIfAnimation } from './../../../../animations/ng-if-animation';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Company } from './../../../../constants/models/company';
import { EndPoints } from './../../../../constants/classes/endpoints';
import { ControllerService } from './../../../../services/controller.service';
import { FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

export interface DialogDetail {
  id: number
  company: Company
}

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss'],
  animations: [ngIfAnimation]
})
export class CompanyDetailsComponent implements OnInit {

  companyForm!: FormGroup

  constructor(
    public ctrl: ControllerService,
    @Inject(MAT_DIALOG_DATA) public data: DialogDetail,
    private dialogRef: MatDialogRef<CompanyDetailsComponent>
  ) { }

  get companyName(): AbstractControl | null {
    return this.companyForm.get('name')
  }

  get companyAddress(): AbstractControl | null {
    return this.companyForm.get('address')
  }

  get companyPhone(): AbstractControl | null {
    return this.companyForm.get('phone')
  }

  ngOnInit(): void {
    this.companyForm = this.ctrl.fb.group({
      name: [this.data.company.name, [Validators.required, Validators.minLength(2)]],
      address: [this.data.company.address, [Validators.required, Validators.minLength(4)]],
      phone: [this.data.company.phone, [Validators.required, Validators.pattern('[- +()0-9]+'), Validators.minLength(10)]],
      is_active: [this.data.company.is_active],
      agencyId: [this.data.company.agencyId, Validators.required]
    })
  }

  updateCompany() {
    this.ctrl.api.put(EndPoints.COMPANY_UPDATE, this.data.id, this.companyForm.value).subscribe(res => {
      if (res.success) {
        this.ctrl.alert.open("La compagnie n'est plus dans la base de données. Veuillez actualiser la page actuelle")
      } else {
        this.ctrl.storage.setAction()
        this.ctrl.alert.updateDone()
        this.dialogRef.close()
      }
    })
  }

}
