import { User } from 'src/app/constants/models/user';
import { ControllerService } from './../../services/controller.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  user!: User

  constructor(public ctrl: ControllerService) { }

  ngOnInit(): void {
    this.user = this.ctrl.storage.user()
  }

}
