import { ControllerService } from './controller.service';
import { ENV } from './../constants/classes/env-variables';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { buildParameters } from '../helpers/build-parameters';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  apiUrl = ENV.API_URL

  constructor(private http: HttpClient) { }

  get(endpoint: string, params: Array<[string, string]>): Observable<any> {
    return this.http.get<any>(this.apiUrl + endpoint + buildParameters(params))
  }

  post(endpoint: string, body: Object): Observable<any> {
    return this.http.post<any>(this.apiUrl + endpoint, JSON.stringify(body))
  }
}
