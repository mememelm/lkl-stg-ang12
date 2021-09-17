import { EndPoints } from './../../routes/endpoints';
import { ControllerService } from './../../services/controller.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  errorLogin = false
  currentYear = new Date()

  constructor(public ctrl: ControllerService) { }

  get email(): AbstractControl | null {
    return this.loginForm.get('email')
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password')
  }

  ngOnInit(): void {
    localStorage.clear()
    localStorage.setItem('INIT_TOKEN', '_')
    this.loginForm = this.ctrl.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    this.ctrl.auth.login(EndPoints.AUTH, [
      ['grant_type', 'password'],
      ['username', this.email?.value],
      ['password', this.password?.value]
    ]).subscribe((res: any) => {
      if (res.access_token) {
        this.setUserStorage(this.email?.value)
        localStorage.setItem('ACCESS_TOKEN', res.access_token)
        localStorage.removeItem('INIT_TOKEN')
        this.ctrl.router.navigate([this.ctrl.routes.dashboard])
      }
    }, (() => { this.errorLogin = true }))
  }

  setUserStorage(email: string) {
    switch (email) {
      case 'admin.betax@yopmail.com':
        this.userStorage('Meidhi', 'Johan', 'ADMIN')
        break
      case 'user.betax@yopmail.com':
        this.userStorage('Melane', 'Lamar', 'USER')
        break
      case 'super.betax@yopmail.com':
        this.userStorage('Maylan', 'Druge', 'SUPER_USER')
        break
      default:
        break
    }
  }

  userStorage(firstname: string, lastname: string, role: string) {
    localStorage.setItem('CURRENT_USER', JSON.stringify({
      firstname: firstname,
      lastname: lastname,
      role: role
    }))
  }

}