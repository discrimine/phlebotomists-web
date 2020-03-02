import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { Subscription } from 'rxjs';

import { UsersService } from '../../services/users.service';
import { LoggedUserService } from './../../services/logged-user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {

  private user: FormGroup;
  private subscriptions: Subscription[];

  constructor(
    private loggedUserService: LoggedUserService,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.subscriptions = [];
    this.user = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  public signIn(): void {
    this.subscriptions.push(
      this.usersService.signIn(this.user.get('login').value, this.user.get('password').value)
        .subscribe(
          // TODO: be response typisation
          (response: any) => {
            this.loggedUserService.setUser({ ...response.data, token: response.token });
            this.router.navigate(['dashboard']);
          },
          (msg: HttpErrorResponse) => this.usersService.errorHandler(msg)
        )
    );
  }
}
