import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar: MatSnackBar) { }

  open(message: string) {
    this.snackBar.open(message, 'Fermer', { duration: 5000 })
  }
}
