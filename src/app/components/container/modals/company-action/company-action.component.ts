import { ngIfAnimation } from 'src/app/animations/ng-if-animation';
import { Company } from './../../../../constants/models/company';
import { EndPoints } from './../../../../constants/classes/endpoints';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ControllerService } from './../../../../services/controller.service';
import { User } from './../../../../constants/models/user';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

export interface DialogDetail {
  id: number
  company: Company
}

@Component({
  selector: 'app-company-action',
  templateUrl: './company-action.component.html',
  styleUrls: ['./company-action.component.scss'],
  animations: [ngIfAnimation]
})
export class CompanyActionComponent implements OnInit {

  companyForm!: FormGroup
  userForm!: FormGroup
  user!: User
  action = ''

  constructor(
    public ctrl: ControllerService,
    @Inject(MAT_DIALOG_DATA) public data: DialogDetail,
    private dialogRef: MatDialogRef<CompanyActionComponent>
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

  get companyAgencyId(): AbstractControl | null {
    return this.companyForm.get('agencyId')
  }

  get username(): AbstractControl | null {
    return this.userForm.get('username')
  }

  get email(): AbstractControl | null {
    return this.userForm.get('email')
  }

  get userCompanyId(): AbstractControl | null {
    return this.userForm.get('companyId')
  }

  get userAgencyId(): AbstractControl | null {
    return this.userForm.get('agencyId')
  }

  ngOnInit(): void {
    this.user = this.ctrl.storage.user()
    this.data.company ? this.action = 'update' : this.action = 'add'
    this.initCompany()
    this.initUser()
  }

  initCompany() {
    this.companyForm = this.ctrl.fb.group({
      name: [this.updateValue(this.data, 'name', ''), [Validators.required, Validators.minLength(2)]],
      address: [this.updateValue(this.data, 'address', ''), [Validators.required, Validators.minLength(4)]],
      phone: [this.updateValue(this.data, 'phone', ''), [Validators.required, Validators.pattern('[- +()0-9]+'), Validators.minLength(10)]],
      is_active: [this.updateValue(this.data, 'is_active', 1)],
      agencyId: [
        this.user.role == 'ADMIN' ? this.updateValue(this.data, 'agencyId', '') : this.user.agencyId,
        Validators.required
      ]
    })
  }

  updateValue(element: any, index: any, defaultValue: string | number) {
    return this.action == 'update' ? element.company[index] : defaultValue
  }

  initUser() {
    this.userForm = this.ctrl.fb.group({
      role: ['COMPANY'],
      email: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      gender: ['', Validators.required],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern('[- +()0-9]+')]],
      identity_card: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^[0-9]\d*$/)]],
      agencyId: [''],
      companyId: ['']
    })
  }

  addCompany() {
    this.ctrl.api.get(EndPoints.USER_EXIST, [
      ['email', this.email?.value],
      ['username', this.username?.value]
    ]).subscribe(res => {
      res.length > 0 ? this.ctrl.alert.open("Le nom d'utilisateur ou l'email est déjà assigné à un utilisateur.") : this.postCompany()
    })
  }

  postCompany() {
    this.userAgencyId?.setValue(this.companyAgencyId?.value)
    this.ctrl.api.post(EndPoints.COMPANY_ADD, this.companyForm.value).subscribe((company: Company) => {
      if (company) {
        this.addUserAffiliate(company.id)
      }
    })
  }

  addUserAffiliate(companyId: number) {
    this.userCompanyId?.setValue(companyId)
    this.ctrl.api.post(EndPoints.SIGN, this.userForm.value).subscribe(res => {
      if (res.message) {
        this.ctrl.storage.setAction()
        this.ctrl.alert.open("La compagnie et l'utilisateur affilié ont été enregistrés")
        this.dialogRef.close()
      }
    }, () => { this.ctrl.alert.serverError() })
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
