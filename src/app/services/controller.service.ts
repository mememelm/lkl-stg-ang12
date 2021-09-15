import { AuthService } from './auth.service';
import { ApiClientService } from './api-client.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { RoutesExt } from '../routes/routes';

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
  ) { }
}
