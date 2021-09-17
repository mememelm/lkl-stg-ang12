import { ENV } from './../constants/classes/env-variables';
import { ControllerService } from './controller.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  public auth: string | undefined

  constructor(
    private ctrl: ControllerService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let init = this.ctrl.storage.getLocalString('INIT_TOKEN')
    init ? this.auth = 'Basic ' + ENV.BASIC_AUTH : this.auth = 'Bearer ' + this.ctrl.storage.getLocalString('ACCESS_TOKEN')
    request = request.clone({
      setHeaders: {
        'Authorization': <string>this.auth,
        'Content-Type': 'application/json'
      }
    })
    return next.handle(request)
      .pipe(catchError(this.handleError))
  }

  public handleError(error: HttpErrorResponse) {
    let errorMessage = ''
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`
    } else {
      errorMessage = `CodeError: ${error.status}\nMessage: ${error.message}`
    }
    return throwError(errorMessage)
  }
}
