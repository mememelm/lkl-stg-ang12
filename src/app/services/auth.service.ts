import { ControllerService } from './controller.service';
import { ENV } from './../constants/classes/env-variables';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { buildParameters } from '../helpers/build-parameters';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = ENV.API_URL

  constructor(private http: HttpClient) { }

  login(endpoint: string, params: Array<[string, string]>): Observable<any> {
    const url = this.apiUrl + endpoint + buildParameters(params)
    return this.http.post<any>(url, '')
  }
}
