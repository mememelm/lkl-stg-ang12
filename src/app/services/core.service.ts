import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private router: Router) { }

  logout(): void {
    localStorage.clear()
    this.router.navigate([''])
  }
}
