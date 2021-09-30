import { EndPoints } from './../../../../constants/classes/endpoints';
import { ControllerService } from './../../../../services/controller.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogDelete {
  id: number
  component: string
  title: string
}

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent implements OnInit {

  title!: string

  constructor(
    public ctrl: ControllerService,
    @Inject(MAT_DIALOG_DATA) public data: DialogDelete,
    private dialogRef: MatDialogRef<DeleteConfirmationComponent>
  ) { }

  ngOnInit(): void {
    this.title = this.data.title
  }

  confirmDelete() {
    switch (this.data.component) {
      case 'agency':
        this.delete(EndPoints.AGENCY_DELETE, 'agence')
        break
      case 'company':
        this.delete(EndPoints.COMPANY_DELETE, 'compagnie')
        break
      default:
        break
    }
  }

  delete(endpoint: string, target: string) {
    this.ctrl.api.delete(endpoint, this.data.id).subscribe(res => {
      if (res.message === 'success') {
        this.ctrl.storage.setAction()
        this.ctrl.alert.open("Suppression " + target + " effectuée")
        this.dialogRef.close()
      } else {
        this.ctrl.alert.open("L'agence n'est plus dans la base de données. Veuillez actualiser la page actuelle")
      }
    })
  }

}
