import { ControllerService } from './controller.service';
import { ENV } from './../constants/classes/env-variables';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  apiUrl = ENV.API_URL

  constructor(private http: HttpClient) {
    // this.ctrl.intercept.auth = 'Bearer ' + this.ctrl.storage.token()
  }

  get(endpoint: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + endpoint)
  }
}
