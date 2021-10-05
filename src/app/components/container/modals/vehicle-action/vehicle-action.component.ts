import { ngIfAnimation } from './../../../../animations/ng-if-animation';
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
  styleUrls: ['./vehicle-action.component.scss'],
  animations: [ngIfAnimation]
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
    this.user = this.ctrl.storage.user()
    this.listCategory = this.ctrl.storage.category()
    this.listPlace = this.ctrl.storage.place()
    this.vehicleForm = this.ctrl.fb.group({
      registration: [this.updateValue(this.data, 'registration', ''), Validators.required],
      category: [this.updateValue(this.data, 'category', ''), Validators.required],
      place: [this.updateValue(this.data, 'place', ''), Validators.required],
      brand: [this.updateValue(this.data, 'brand', ''), Validators.required],
      model: [this.updateValue(this.data, 'model', ''), Validators.required],
      state: [this.updateValue(this.data, 'state', 1)],
      companyId: [
        this.user.role == 'COMPANY' ? this.user.companyId : this.updateValue(this.data, 'companyId', ''),
        Validators.required
      ]
    })
  }

  updateValue(element: any, index: any, defaultValue: string | number) {
    return this.action == 'update' ? element.vehicle[index] : defaultValue
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

  updateVehicle() {
    this.ctrl.api.put(EndPoints.VEHICLE_UPDATE, this.data.id, this.vehicleForm.value).subscribe(res => {
      if (res.success) {
        this.ctrl.alert.open("Le véhicule n'est plus dans la base de données. Veuillez actualiser la page actuelle")
      } else {
        this.ctrl.storage.setAction()
        this.ctrl.alert.updateDone()
        this.dialogRef.close()
      }
    })
  }
}
