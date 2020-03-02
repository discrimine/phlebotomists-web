import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { UsersService } from 'src/app/users/services/users.service';
import { OrdersService } from './../../services/orders.service';
import { SearchFacilityDialogComponent } from '../search-facility-dialog/search-facility-dialog.component';

import { MatSelectList } from 'src/app/core/interfaces/angular-material.interfaces';

@Component({
  selector: 'app-create-order-dialog',
  templateUrl: './create-order-dialog.component.html',
  styleUrls: ['./create-order-dialog.component.scss']
})
export class CreateOrderDialogComponent implements OnInit, OnDestroy {

  public order: FormGroup;
  public equipmentList: BehaviorSubject<MatSelectList<string>[]>;

  private subscriptions: Subscription[];

  constructor(
    public dialogRef: MatDialogRef<CreateOrderDialogComponent>,
    // TODO: provide type if needed
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private dialog: MatDialog,
    private ordersService: OrdersService,
  ) {
    this.order = this.formBuilder.group({
      doctor: [{value: 'Doctor 1', disabled: true}],
      analysisType: ['', Validators.required],
      patients: [[]],
      equipment: [[]],
      address: [{value: '', disabled: true}, Validators.required],
      location: [{}],
    });
    this.subscriptions = [];
    this.equipmentList = new BehaviorSubject([]);
    this.initEquipmentList();
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

  public openSearchFacilityDialog(): void {
    this.subscriptions.push(
      this.dialog.open(SearchFacilityDialogComponent, {
      })
        .afterClosed()
        .subscribe((data: any): void => {
          this.order.patchValue({address: data.address});
          this.order.patchValue({location: data.location});
        })
    );
  }

  public submitOrder(): void {
    this.dialogRef.close(this.order.getRawValue());
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
