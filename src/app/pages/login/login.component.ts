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

  constructor(public ctrl: ControllerService) { }

  get username(): AbstractControl | null {
    return this.loginForm.get('username')
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password')
  }

  ngOnInit(): void {
    localStorage.clear()
    localStorage.setItem('INIT_TOKEN', '_I')
    this.loginForm = this.ctrl.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    this.ctrl.auth.login(EndPoints.AUTH, [
      ['grant_type', 'password'],
      ['username', this.username?.value],
      ['password', this.password?.value]
    ]).subscribe((res: any) => {
      if (res.access_token) {
        localStorage.setItem('ACCESS_TOKEN', res.access_token)
        localStorage.removeItem('INIT_TOKEN')
        this.ctrl.router.navigate([this.ctrl.routes.dashboard])
      } if (res.error) {
        console.log('error')
      }
    })
  }

}
