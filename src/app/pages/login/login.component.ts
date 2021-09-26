import { EndPoints } from '../../constants/classes/endpoints';
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
    this.loginForm = this.ctrl.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    this.ctrl.api.post(EndPoints.LOGIN, this.loginForm.value).subscribe((res: any) => {
      if (res.message === 'success') {
        localStorage.setItem('ACCESS_TOKEN', res.token)
        this.ctrl.router.navigate([this.ctrl.routes.home])
      }
    }, (() => { this.errorLogin = true }))
  }

}
