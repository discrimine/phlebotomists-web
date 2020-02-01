import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { CreateOrderDialogComponent } from '../../create-order-dialog/create-order-dialog.component';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[];

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) {
    this.subscriptions = [];
  }

  ngOnInit() {
  }

  public logout(): void {
    this.router.navigate(['/signin']);
  }

  public createOrder(): void {
    this.subscriptions.push(
      this.dialog.open(CreateOrderDialogComponent, {
        data: {}
      }).afterClosed().pipe(take(1))
        .subscribe(result => {
          console.log('The dialog was closed', result);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    })
  }

}
