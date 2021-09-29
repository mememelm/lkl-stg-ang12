import { EndPoints } from './../../../../constants/classes/endpoints';
import { ControllerService } from './../../../../services/controller.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
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
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
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

      default:
        break
    }
  }

  delete(endpoint: string, target: string) {
    this.ctrl.api.delete(endpoint, this.data.id).subscribe(res => {
      if (res.message === 'success') {
        localStorage.setItem('AC', '_')
        this.ctrl.alert.open("Suppression " + target + " effectuée")
        this.dialogRef.close()
      } else {
        this.ctrl.alert.open("L'agence n'est plus dans la base de données. Recharger la page actuelle")
      }
    })
  }

}
