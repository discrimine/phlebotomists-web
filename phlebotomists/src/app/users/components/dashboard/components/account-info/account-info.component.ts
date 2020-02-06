import { Component, OnInit } from '@angular/core';

import { LoggedUserService } from './../../../../services/logged-user.service';
import { User } from './../../../../interfaces/user.interfaces';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {

  public user: User;

  constructor(
    private loggedUserService: LoggedUserService,
  ) {
  }

  ngOnInit() { }

}
