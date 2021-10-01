import { placeList } from './../../helpers/place-list';
import { categoryList } from './../../helpers/categorie-list';
import { ngIfAnimation } from './../../animations/ng-if-animation';
import { User } from './../../constants/models/user';
import { EndPoints } from '../../constants/classes/endpoints';
import { ControllerService } from './../../services/controller.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [ngIfAnimation]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  error = false
  passwordError = false
  userError = false
  currentYear = new Date()
  user!: User

  constructor(public ctrl: ControllerService) { }

  ngOnInit(): void {
    this.loginForm = this.ctrl.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    this.ctrl.api.post(EndPoints.LOGIN, this.loginForm.value).subscribe((res: any) => {
      const message = res.message
      switch (message) {
        case 'success':
          localStorage.setItem('ACCESS_TOKEN', res.token)
          localStorage.setItem('CURRENT_USER', JSON.stringify(res.user))
          localStorage.setItem('AGENCY', JSON.stringify(res.agency))
          localStorage.setItem('COMPANY', JSON.stringify(res.company))
          localStorage.setItem('CATEGORY', JSON.stringify(categoryList))
          localStorage.setItem('PLACE', JSON.stringify(placeList))
          this.ctrl.router.navigate([this.ctrl.routes.home])
          break
        case 'password_error':
          this.error = true
          this.userError = false
          this.passwordError = true
          this.user = res.user
          break
        case 'user_not_in_db':
          this.error = true
          this.userError = true
          break
        default:
          break
      }
    })
  }

}
