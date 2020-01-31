import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsersService } from '../../services/users.service';


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
      this.router.navigate(['dashboard']);
    }
  }
}
