import { ngIfAnimation } from './../../../animations/ng-if-animation';
import { FormGroup } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
  animations: [ngIfAnimation]
})
export class UserAddComponent {

  @Input() display = true
  @Input() userTitle!: string
  @Input() userForm!: FormGroup

}
