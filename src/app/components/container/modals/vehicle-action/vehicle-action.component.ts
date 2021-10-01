import { EndPoints } from './../../../../constants/classes/endpoints';
import { Vehicle } from './../../../../constants/models/vehicle';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ControllerService } from './../../../../services/controller.service';
import { User } from './../../../../constants/models/user';
import { FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

export interface DialogDetail {
  id: number
  vehicle: Vehicle
}

@Component({
  selector: 'app-vehicle-action',
  templateUrl: './vehicle-action.component.html',
  styleUrls: ['./vehicle-action.component.scss']
})
export class VehicleActionComponent implements OnInit {

  vehicleForm!: FormGroup
  user!: User
  listCategory: any
  listPlace: any
  action = ''

  constructor(
    public ctrl: ControllerService,
    @Inject(MAT_DIALOG_DATA) public data: DialogDetail,
    private dialogRef: MatDialogRef<VehicleActionComponent>
  ) { }

  ngOnInit(): void {
    this.data.vehicle ? this.action = 'update' : this.action = 'add'
    console.log(this.action)
    this.user = this.ctrl.storage.user()
    this.listCategory = this.ctrl.storage.category()
    this.listPlace = this.ctrl.storage.place()
    this.vehicleForm = this.ctrl.fb.group({
      registration: ['', Validators.required],
      category: ['', Validators.required],
      place: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      state: [1],
      companyId: [
        this.user.role == 'COMPANY' ? this.user.companyId : '',
        Validators.required
      ]
    })
  }

  addVehicle() {
    this.ctrl.api.post(EndPoints.VEHICLE_ADD, this.vehicleForm.value).subscribe((vehicle: Vehicle) => {
      if (vehicle) {
        this.ctrl.storage.setAction()
        this.ctrl.alert.open("Le véhicle a été enregistré")
        this.dialogRef.close()
      }
    }, () => { this.ctrl.alert.serverError() })
  }
}
