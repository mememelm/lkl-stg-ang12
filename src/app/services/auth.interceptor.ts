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
import { catchError, retry } from "rxjs/operators";
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  public auth: string | undefined

  constructor(
    private router: Router,
    private ctrl: ControllerService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        'Authorization': <string>this.auth,
        'Content-Type': 'application/json'
      }
    })
    return next.handle(request)
      .pipe(retry(1), catchError(this.handleError))
  }

  public handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.router.navigate([this.ctrl.routes.login])
      location.reload()
    }
    let errorMessage = ''
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`
    } else {
      errorMessage = `CodeError: ${error.status}\nMessage: ${error.message}`
    }
    return throwError(errorMessage)
  }
}
