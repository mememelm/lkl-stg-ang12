import { ControllerService } from './../services/controller.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, NavigationError, RouterStateSnapshot, RoutesRecognized, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  authorization = true

  constructor(private ctrl: ControllerService) {
    this.ctrl.router.events.forEach(event => event instanceof NavigationError)
      .then(() => { this.authorization = false })
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url = state.url.split('?')[0]
    if (url == '/') {
      this.authorization = true
      this.ctrl.router.navigate([this.ctrl.routes.error], { queryParams: { invalid_url: '?' } })
    }
    return this.authorization
  }

}
