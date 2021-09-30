import { User } from './../../../../constants/models/user';
import { MatDialogRef } from '@angular/material/dialog';
import { Company } from './../../../../constants/models/company';
import { EndPoints } from './../../../../constants/classes/endpoints';
import { ngIfAnimation } from './../../../../animations/ng-if-animation';
import { ControllerService } from './../../../../services/controller.service';
import { FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.scss'],
  animations: [ngIfAnimation]
})
export class CompanyAddComponent implements OnInit {

  companyForm!: FormGroup
  userForm!: FormGroup
  user!: User

  constructor(
    public ctrl: ControllerService,
    private dialogRef: MatDialogRef<CompanyAddComponent>
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
    this.initCompany()
    this.initUser()
  }

  initCompany() {
    this.companyForm = this.ctrl.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required, Validators.minLength(4)]],
      phone: ['', [Validators.required, Validators.pattern('[- +()0-9]+'), Validators.minLength(10)]],
      is_active: [1],
      agencyId: [
        this.user.role == 'ADMIN' ? '' : this.user.agencyId,
        Validators.required
      ]
    })
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

}
