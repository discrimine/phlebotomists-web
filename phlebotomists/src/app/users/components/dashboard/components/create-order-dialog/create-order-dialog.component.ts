import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription, BehaviorSubject } from 'rxjs';

import { MatSelectList } from 'src/app/core/interfaces/angular-material.interfaces';
import { UsersService } from 'src/app/users/services/users.service';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-order-dialog',
  templateUrl: './create-order-dialog.component.html',
  styleUrls: ['./create-order-dialog.component.scss']
})
export class CreateOrderDialogComponent implements OnInit, OnDestroy {

  public order: FormGroup;
  public equipmentList: BehaviorSubject<MatSelectList<String>[]>;

  private subscriptions: Subscription[];

  constructor(
    public dialogRef: MatDialogRef<CreateOrderDialogComponent>,
    // TODO: provide type if needed
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
  ) {
    this.order = this.formBuilder.group({
      doctor: ['', Validators.required],
      analysisType: ['', Validators.required],
      patients: [[]],
      facility: ['', Validators.required],
      location: ['', Validators.required],
      equipment: [[]],
    });
    this.subscriptions = [];
    this.equipmentList = new BehaviorSubject([]);
    this.initEquipmentList();
  }

  ngOnInit() {

  }

  public submitOrder(): void {
    console.log(this.order.getRawValue());
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
