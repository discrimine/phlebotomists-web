import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsersService } from '../../services/users.service';
import { LoggedUserService } from './../../services/logged-user.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  private user: FormGroup;

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private router: Router,
    private loggedUserService: LoggedUserService,
  ) {
    this.user = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  public signIn(): void {
    const loginInfo = this.usersService.signIn(this.user.get('login').value, this.user.get('password').value);
    if (loginInfo) {
      this.loggedUserService.setUser(this.user.getRawValue());
      this.router.navigate(['dashboard']);
    }
  }
}
