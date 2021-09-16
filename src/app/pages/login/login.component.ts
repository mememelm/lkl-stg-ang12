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
  currentYear = new Date()

  constructor(public ctrl: ControllerService) { }

  get emai(): AbstractControl | null {
    return this.loginForm.get('emai')
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
      ['username', this.emai?.value],
      ['password', this.password?.value]
    ]).subscribe((res: any) => {
      if (res.access_token) {
        localStorage.setItem('ACCESS_TOKEN', res.access_token)
        localStorage.removeItem('INIT_TOKEN')
        this.ctrl.router.navigate([this.ctrl.routes.dashboard])
      }
    })
  }

}
