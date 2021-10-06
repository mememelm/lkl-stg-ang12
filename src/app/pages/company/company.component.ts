import { CompanyActionComponent } from './../../components/container/modals/company-action/company-action.component';
import { User } from './../../constants/models/user';
import { DeleteConfirmationComponent } from './../../components/shared/modals/delete-confirmation/delete-confirmation.component';
import { EndPoints } from './../../constants/classes/endpoints';
import { frenchDataTable } from './../../constants/languages/french-datatable';
import { Company } from './../../constants/models/company';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ngIfAnimation } from './../../animations/ng-if-animation';
import { ControllerService } from './../../services/controller.service';
import { Component, OnInit, ViewChild, OnChanges, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  animations: [ngIfAnimation]
})
export class CompanyComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild(DataTableDirective, { static: false }) dtElement!: DataTableDirective
  dtOptions: DataTables.Settings = {}
  dtTrigger = new Subject<any>()
  listCompany: Company[] = []
  initEndpoint!: string

  constructor(public ctrl: ControllerService) { }

  ngOnInit(): void {
    const user: User = this.ctrl.storage.user()
    switch (user.role) {
      case 'ADMIN':
        this.initEndpoint = EndPoints.COMPANY_GET
        break
      case 'AGENCY':
        this.initEndpoint = EndPoints.COMPANY_BY_AGENCY + user.agencyId
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
    this.loadCompany(this.initEndpoint)
  }

  ngOnChanges(): void {
    this.loadChange()
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
  }

  loadCompany(endpoint: string) {
    this.ctrl.api.get(endpoint).subscribe((company: Company[]) => {
      this.listCompany = company
      this.dtTrigger.next()
    })
  }

  loadChange() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy()
      this.loadCompany(this.initEndpoint)
    })
  }

  actionCompany(company: Company | null = null) {
    this.ctrl.storage.removeAction()
    this.ctrl.modal.open(CompanyActionComponent, {
      data: { id: company?.id, company: company }
    }).afterClosed().subscribe(() => {
      if (this.ctrl.storage.action()) this.loadChange()
    })
  }

  openDelete(id: number, name: string) {
    this.ctrl.storage.removeAction()
    this.ctrl.modal.open(DeleteConfirmationComponent, {
      data: {
        id: id,
        component: 'company',
        title: 'Suppression de la compagnie ' + name
      }
    }).afterClosed().subscribe(() => {
      if (this.ctrl.storage.action()) this.loadChange()
    })
  }

}
