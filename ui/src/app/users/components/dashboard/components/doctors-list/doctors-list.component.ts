import { UsersService } from 'src/app/users/services/users.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ColDef } from "ag-grid-community";
import { LoggedUserService } from 'src/app/users/services/logged-user.service';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.scss']
})
export class DoctorsListComponent implements OnInit {

  public doctors;

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

  constructor(
    private http: HttpClient,
    private usersService: UsersService,
    private loggedUserService: LoggedUserService,
  ) { }

  ngOnInit() {
    //console.log
    this.http.get('http://127.0.0.1:8000/api/doctors?token='+this.loggedUserService.getUser().token)
      .subscribe((data) => {
        console.log(data);
        this.doctors = data;
      })
  }

}
