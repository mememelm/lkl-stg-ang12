import { EndPoints } from './../../../../constants/classes/endpoints';
import { User } from './../../../../constants/models/user';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ngIfAnimation } from './../../../../animations/ng-if-animation';
import { FormGroup, Validators } from '@angular/forms';
import { ControllerService } from './../../../../services/controller.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Price } from 'src/app/constants/models/pricing';

export interface DialogDetail {
  id: number
  price: Price
}

@Component({
  selector: 'app-pricing-action',
  templateUrl: './pricing-action.component.html',
  styleUrls: ['./pricing-action.component.scss'],
  animations: [ngIfAnimation]
})
export class PricingActionComponent implements OnInit {

  priceForm!: FormGroup
  user!: User
  action = ''

  constructor(
    public ctrl: ControllerService,
    @Inject(MAT_DIALOG_DATA) public data: DialogDetail,
    private dialogRef: MatDialogRef<PricingActionComponent>
  ) { }

  ngOnInit(): void {
    this.data.price ? this.action = 'update' : this.action = 'add'
    this.user = this.ctrl.storage.user()
    this.priceForm = this.ctrl.fb.group({
      description: [this.updateValue(this.data, 'description', ''), Validators.required],
      increased_price: [this.updateValue(this.data, 'increased_price', 0), Validators.required],
      companyId: [this.user.companyId],
      agencyId: [this.user.agencyId]
    })
  }

  updateValue(element: any, index: any, defaultValue: string | number) {
    return this.action == 'update' ? element.price[index] : defaultValue
  }

  addPricing() {
    this.ctrl.api.post(EndPoints.PRICING_ADD, this.priceForm.value).subscribe((price: Price) => {
      if (price) {
        this.ctrl.storage.setAction()
        this.ctrl.alert.open("Le tarif a été enregistré")
        this.dialogRef.close()
      }
    }, () => { this.ctrl.alert.serverError() })
  }

  updatePricing() {
    this.ctrl.api.put(EndPoints.PRICING_UPDATE, this.data.id, this.priceForm.value).subscribe(res => {
      if (res.success) {
        this.ctrl.alert.open("Ce tarif n'est plus dans la base de données. Veuillez actualiser la page actuelle")
      } else {
        this.ctrl.storage.setAction()
        this.ctrl.alert.updateDone()
        this.dialogRef.close()
      }
    })
  }

}
