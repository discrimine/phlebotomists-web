import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LoggedUserService } from '../../services/logged-user.service';
import { User } from '../../interfaces/user.interfaces';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public user: User;

  constructor(
    private router: Router,
    private loggedUserService: LoggedUserService,
    private flashMessage: MatSnackBar,
  ) {
    this.initUser();
  }

  ngOnInit(): void {
   
  }

  public logout(): void {
    this.router.navigate(['/signin']);
  }

  private initUser(): void {
    this.user = this.loggedUserService.getUser();

    if (!this.user) {
      this.flashMessage.open('You are not logged', 'Close', { duration: 1000 })
       .afterDismissed()
       .pipe(take(1))
       .subscribe(() => this.logout())
    }
  }
}
