import { CompanyAddComponent } from './../../components/container/modals/company-add/company-add.component';
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

  constructor(public ctrl: ControllerService) { }

  ngOnInit(): void {
    this.dtOptions = {
      language: frenchDataTable,
      pagingType: 'full_numbers',
      lengthMenu: [
        [5, 10, 50, -1],
        [5, 10, 50, 'Tous']
      ],
      order: [[0, 'asc']]
    }
    this.loadCompany()
  }

  ngOnChanges(): void {
    this.loadChange()
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
  }

  loadCompany() {
    this.ctrl.api.get(EndPoints.COMPANY_GET).subscribe((company: Company[]) => {
      this.listCompany = company
      this.dtTrigger.next()
    })
  }

  loadChange() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy()
      this.loadCompany()
    })
  }

  openAddCompany(): void {
    this.ctrl.storage.removeAction()
    this.ctrl.modal.open(CompanyAddComponent, { panelClass: 'width-dialog' }).afterClosed().subscribe(() => {
      if (this.ctrl.storage.action()) this.loadChange()
    })
  }

}
