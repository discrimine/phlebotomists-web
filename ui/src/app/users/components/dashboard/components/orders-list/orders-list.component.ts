import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Subscription, BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

import { OrdersService } from '../../services/orders.service';
import { CreateOrderDialogComponent } from '../create-order-dialog/create-order-dialog.component';
import { SortedOrders, Order } from '../../interfaces/dashboard.interfaces';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit, OnDestroy {

  public orders: SortedOrders;
  private subscriptions: Subscription[];

  constructor(
    private ordersService: OrdersService,
    private dialog: MatDialog,
  ) {
    this.subscriptions = [];
    this.orders = this.ordersService.getOrders();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }

  public createOrder(): void {
    this.dialog.open(CreateOrderDialogComponent, {
      width: '600px',
      data: {},
    }).afterClosed().pipe(take(1))
      .subscribe((result: Order) => {
        this.subscriptions.push(this.ordersService.addNewOrder(result)
          .subscribe((newOrders) => {
            this.orders = newOrders;
            this.orders.new = newOrders.new;
          })
        );
      });
  }

}
