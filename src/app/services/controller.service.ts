import { CoreService } from './core.service';
import { AlertService } from './alert.service';
import { ApiClientService } from './api-client.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { RoutesExt } from '../routes/routes';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {

  constructor(
    public router: Router,
    public routes: RoutesExt,
    public fb: FormBuilder,
    public storage: StorageService,
    public api: ApiClientService,
    public alert: AlertService,
    public core: CoreService,
    public modal: MatDialog
  ) { }

}
