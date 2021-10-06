import { ngIfAnimation } from './../../animations/ng-if-animation';
import { frenchDataTable } from './../../constants/languages/french-datatable';
import { DeleteConfirmationComponent } from './../../components/shared/modals/delete-confirmation/delete-confirmation.component';
import { EndPoints } from './../../constants/classes/endpoints';
import { Price } from './../../constants/models/pricing';
import { PricingActionComponent } from './../../components/container/modals/pricing-action/pricing-action.component';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { User } from 'src/app/constants/models/user';
import { ControllerService } from './../../services/controller.service';
import { Component, OnInit, ViewChild, OnChanges, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
  animations: [ngIfAnimation]
})
export class PricingComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild(DataTableDirective, { static: false }) dtElement!: DataTableDirective
  dtOptions: DataTables.Settings = {}
  dtTrigger = new Subject<any>()
  user!: User
  listPricing: Price[] = []
  initEndpoint!: string

  constructor(public ctrl: ControllerService) { }

  ngOnInit(): void {
    this.user = this.ctrl.storage.user()
    switch (this.user.role) {
      case 'ADMIN':
        this.initEndpoint = EndPoints.PRICING_GET
        break;
      case 'AGENCY':
        this.initEndpoint = EndPoints.PRICING_BY_AGENCY + this.user.agencyId
        break
      case 'COMPANY':
        this.initEndpoint = EndPoints.PRICING_BY_COMPANY + this.user.companyId
        break
      default:
        break
    }
    this.dtOptions = {
      language: frenchDataTable,
      pagingType: 'full_numbers',
      lengthMenu: [
        [5, 10, 50, -1],
        [5, 10, 50, 'Tous']
      ],
      order: [[0, 'asc']]
    }
    this.loadPricing(this.initEndpoint)
  }

  ngOnChanges(): void {
    this.loadChange(this.initEndpoint)
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
  }

  loadPricing(endpoint: string) {
    this.ctrl.api.get(endpoint).subscribe((price: Price[]) => {
      this.listPricing = price
      this.dtTrigger.next()
    })
  }

  loadChange(endpoint: string) {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy()
      this.loadPricing(endpoint)
    })
  }

  actionPricing(price: Price | null = null) {
    this.ctrl.storage.removeAction()
    this.ctrl.modal.open(PricingActionComponent, {
      data: { id: price?.id, price: price }
    }).afterClosed().subscribe(() => {
      if (this.ctrl.storage.action()) this.loadChange(this.initEndpoint)
    })
  }

  openDelete(id: number, description: string) {
    this.ctrl.storage.removeAction()
    this.ctrl.modal.open(DeleteConfirmationComponent, {
      data: {
        id: id,
        component: 'pricing',
        title: 'Suppression du tarif ' + description
      }
    }).afterClosed().subscribe(() => {
      if (this.ctrl.storage.action()) this.loadChange(this.initEndpoint)
    })
  }

}
