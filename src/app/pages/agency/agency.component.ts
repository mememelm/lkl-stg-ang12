import { AgencyDetailsComponent } from './../../components/container/modals/agency-details/agency-details.component';
import { DeleteConfirmationComponent } from './../../components/shared/modals/delete-confirmation/delete-confirmation.component';
import { FormGroup, Validators } from '@angular/forms';
import { EndPoints } from './../../constants/classes/endpoints';
import { Agency } from './../../constants/models/agency';
import { frenchDataTable } from './../../constants/languages/french-datatable';
import { ControllerService } from './../../services/controller.service';
import { ngIfAnimation } from './../../animations/ng-if-animation';
import { Component, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { AgencyAddComponent } from 'src/app/components/container/modals/agency-add/agency-add.component';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss'],
  animations: [ngIfAnimation]
})
export class AgencyComponent implements OnInit, OnDestroy, OnChanges {

  @ViewChild(DataTableDirective, { static: false }) dtElement!: DataTableDirective
  dtOptions: DataTables.Settings = {}
  dtTrigger = new Subject<any>()
  listAgency: Agency[] = []

  constructor(public ctrl: ControllerService) { }

  ngOnInit(): void {
    this.dtOptions = {
      language: frenchDataTable,
      pagingType: 'full_numbers',
      lengthMenu: [
        [5, 10, 50, -1],
        [5, 10, 50, 'Tous']
      ],
      order: [[0, 'desc']]
    }
    this.loadAgency()
  }

  ngOnChanges(): void {
    this.loadChange()
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
  }

  loadAgency() {
    this.ctrl.api.get(EndPoints.AGENCY_GET).subscribe((agency: Agency[]) => {
      this.listAgency = agency
      this.dtTrigger.next()
    })
  }

  loadChange() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy()
      this.loadAgency()
    })
  }

  openAddAgency() {
    this.ctrl.storage.removeAction()
    this.ctrl.modal.open(AgencyAddComponent).afterClosed().subscribe(() => {
      if (this.ctrl.storage.action()) this.loadChange()
    })
  }

  openDeleteAgency(agenceId: number, agenceName: string) {
    this.ctrl.storage.removeAction()
    this.ctrl.modal.open(DeleteConfirmationComponent, {
      data: {
        id: agenceId,
        component: 'agency',
        title: 'Suppression de l\'agence ' + agenceName
      }
    }).afterClosed().subscribe(() => {
      if (this.ctrl.storage.action()) this.loadChange()
    })
  }

  openDetailAgency(agency: Agency) {
    this.ctrl.storage.removeAction()
    this.ctrl.modal.open(AgencyDetailsComponent, {
      data: { id: agency.id, agency: agency }
    }).afterClosed().subscribe(() => {
      if (this.ctrl.storage.action()) this.loadChange()
    })
  }

}
