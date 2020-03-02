import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { ColDef } from 'ag-grid-community';

import { UsersService } from 'src/app/users/services/users.service';
import { LoggedUserService } from 'src/app/users/services/logged-user.service';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.scss']
})
export class DoctorsListComponent implements OnInit, OnDestroy {

  public doctors: any;
  public columnDefs: ColDef[] = [
    {
      headerName: 'Phone number',
      field: 'phone',
      editable: false,
    }, {
      headerName: 'Long name',
      field: 'long_name',
      editable: false,
    }, {
      headerName: 'Specialty',
      field: 'specialty',
      editable: false,
    }, {
      headerName: 'License',
      field: 'license',
      editable: false,
    }
  ];

  private subscriptions: Subscription[];

  constructor(
    private usersService: UsersService,
    private loggedUserService: LoggedUserService,
  ) {
    this.subscriptions = [];
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.usersService.getDoctorsList(this.loggedUserService.getUser().token)
      .subscribe((data: any) => {
        this.doctors = data;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }

}
