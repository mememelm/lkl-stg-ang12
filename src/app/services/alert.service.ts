import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  duration = { duration: 5000 }

  constructor(private snackBar: MatSnackBar) { }

  open(message: string) {
    this.snackBar.open(message, 'Fermer', this.duration)
  }

  updateDone() {
    this.snackBar.open("Modification terminée!", "Fermer", this.duration)
  }

  serverError() {
    this.snackBar.open("Erreur serveur. Veuillez vous reconnecter!", 'OK', this.duration)
  }
}
