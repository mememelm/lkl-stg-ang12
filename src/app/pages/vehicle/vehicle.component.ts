import { VehicleActionComponent } from './../../components/container/modals/vehicle-action/vehicle-action.component';
import { DeleteConfirmationComponent } from './../../components/shared/modals/delete-confirmation/delete-confirmation.component';
import { ngIfAnimation } from './../../animations/ng-if-animation';
import { EndPoints } from './../../constants/classes/endpoints';
import { User } from './../../constants/models/user';
import { frenchDataTable } from './../../constants/languages/french-datatable';
import { Vehicle } from './../../constants/models/vehicle';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ControllerService } from './../../services/controller.service';
import { Component, OnInit, ViewChild, OnChanges, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
  animations: [ngIfAnimation]
})
export class VehicleComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild(DataTableDirective, { static: false }) dtElement!: DataTableDirective
  dtOptions: DataTables.Settings = {}
  dtTrigger = new Subject<any>()
  listVehicle: Vehicle[] = []
  initEndpoint!: string
  user!: User

  constructor(public ctrl: ControllerService) { }

  ngOnInit(): void {
    this.user = this.ctrl.storage.user()
    switch (this.user.role) {
      case 'ADMIN':
        this.initEndpoint = EndPoints.VEHICLE_GET
        break
      case 'AGENCY':

        break
      case 'COMPANY':
        this.initEndpoint = EndPoints.VEHICLE_BY_COMPANY + this.user.companyId
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
    this.loadVehicle(this.initEndpoint)
  }

  ngOnChanges(): void {
    this.loadChange()
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
  }

  loadVehicle(endpoint: string) {
    this.ctrl.api.get(endpoint).subscribe((vehicle: Vehicle[]) => {
      this.listVehicle = vehicle
      this.dtTrigger.next()
    })
  }

  loadChange() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy()
      this.loadVehicle(this.initEndpoint)
    })
  }

  actionVehicle(vehicle: Vehicle | any) {
    this.ctrl.storage.removeAction()
    this.ctrl.modal.open(VehicleActionComponent, {
      data: { id: vehicle?.id, vehicle: vehicle }
    }).afterClosed().subscribe(() => {
      if (this.ctrl.storage.action()) this.loadChange()
    })
  }

  openDelete(id: number, registration: string) {
    this.ctrl.storage.removeAction()
    this.ctrl.modal.open(DeleteConfirmationComponent, {
      data: {
        id: id,
        component: 'vehicle',
        title: 'Suppression du vehicule immatriculé ' + registration
      }
    }).afterClosed().subscribe(() => {
      if (this.ctrl.storage.action()) this.loadChange()
    })
  }

}
