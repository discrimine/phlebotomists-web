import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { UsersService } from './../../services/users.service';

import { MatSelectList } from './../../../core/interfaces/angular-material.interfaces';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  public equipmentList: BehaviorSubject<MatSelectList<string>[]>;
  public newUserInfo: FormGroup;
  private subscriptions: Subscription[];

  private headers = new HttpHeaders({
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'multipart/form-data',
  });

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) {
    this.equipmentList = new BehaviorSubject([]);
    this.subscriptions = [];
    this.initEquipmentList();
    this.newUserInfo = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      long_name: ['', Validators.required],
      phone: ['', Validators.required],
      specialty: ['', Validators.required],
      license: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
    this.equipmentList.complete();
  }

  public signUp(): void {
    console.log()
    const lol = new FormData();
    // lol.append('email', this.newUserInfo.get('email').value);
    // lol.append('password', this.newUserInfo.get('password').value);
    this.http.post('http://127.0.0.1:8000/api/doctor/register', { ...this.newUserInfo.getRawValue() })
      .subscribe((asd) => {
        console.log(asd);
      });
  }

  private catchErr(error): void {
    console.log(error);
  }

  private initEquipmentList(): void {
    this.subscriptions.push(this.usersService.getEquipmentList()
      .pipe(
        map((equipmentList: MatSelectList<string>[]) => {
          return Array.isArray(equipmentList) ? equipmentList : [];
        })
      )
      .subscribe(
        (equipmentList: MatSelectList<string>[]): void => {
          this.equipmentList.next(equipmentList);
        },
        (error: HttpErrorResponse) => this.catchErr(error),
      ));
  }

}
