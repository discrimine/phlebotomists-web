import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
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
    this.subscriptions.push(
      this.usersService.signUp({ ...this.newUserInfo.getRawValue() })
        .subscribe(() => {
        //TODO: redirect, and other signup's staff
        }))
    ;
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
      ));
  }

}
