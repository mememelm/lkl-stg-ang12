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

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  public auth: string | undefined

  constructor() { }

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
    let errorMessage = ''
    if (error.status === 401) {

    }
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`
    } else {
      errorMessage = `CodeError: ${error.status}\nMessage: ${error.message}`
    }
    return throwError(errorMessage)
  }
}
