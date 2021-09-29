import { ngIfAnimation } from './../../../../animations/ng-if-animation';
import { Agency } from './../../../../constants/models/agency';
import { EndPoints } from './../../../../constants/classes/endpoints';
import { FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ControllerService } from './../../../../services/controller.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agency-add',
  templateUrl: './agency-add.component.html',
  styleUrls: ['./agency-add.component.scss'],
  animations: [ngIfAnimation]
})
export class AgencyAddComponent implements OnInit {

  agencyForm!: FormGroup
  userForm!: FormGroup

  constructor(
    public ctrl: ControllerService,
    private dialogRef: MatDialogRef<AgencyAddComponent>
  ) { }

  get agencyId(): AbstractControl | null {
    return this.userForm.get('agencyId')
  }

  get username(): AbstractControl | null {
    return this.userForm.get('username')
  }

  get email(): AbstractControl | null {
    return this.userForm.get('email')
  }

  ngOnInit(): void {
    this.initAgency()
    this.initUser()
  }

  initAgency() {
    this.agencyForm = this.ctrl.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required, Validators.minLength(4)]]
    })
  }

  initUser() {
    this.userForm = this.ctrl.fb.group({
      role: ['AGENCY'],
      email: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      gender: ['', Validators.required],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern('[- +()0-9]+')]],
      identity_card: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^[0-9]\d*$/)]],
      agencyId: ['']
    })
  }

  addAgency() {
    this.ctrl.api.post(EndPoints.USER_EXIST, {
      email: this.email?.value,
      username: this.username?.value
    }).subscribe(res => {
      res.length > 0 ? this.ctrl.alert.open("Le nom d'utilisateur ou l'email est déjà assigné à un utilisateur.") : this.postAgency()
    })
  }

  postAgency() {
    this.ctrl.api.post(EndPoints.AGENCY_ADD, this.agencyForm.value).subscribe((agency: Agency) => {
      if (agency) {
        this.addUserAffiliate(agency.id)
      }
    })
  }

  addUserAffiliate(agencyId: number) {
    this.agencyId?.setValue(agencyId)
    this.ctrl.api.post(EndPoints.SIGN, this.userForm.value).subscribe(res => {
      if (res.message) {
        localStorage.setItem('AC', '_')
        this.ctrl.alert.open("L'agence et l'utilisateur affilié ont été enregistrés")
        this.dialogRef.close()
      }
    }, () => { this.ctrl.alert.serverError() })
  }

}
