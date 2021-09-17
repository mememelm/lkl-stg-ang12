import { AlertService } from './alert.service';
import { AuthService } from './auth.service';
import { ApiClientService } from './api-client.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { RoutesExt } from '../routes/routes';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {

  constructor(
    public storage: StorageService,
    public router: Router,
    public routes: RoutesExt,
    public api: ApiClientService,
    public auth: AuthService,
    public fb: FormBuilder,
    public alert: AlertService
  ) { }

}
