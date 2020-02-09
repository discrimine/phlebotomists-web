import { Component, OnInit } from '@angular/core';

import { OrdersService } from '../../services/orders.service';
import { SortedOrders } from '../../interfaces/dashboard.interfaces';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {

  public orders: SortedOrders;

  constructor(
    private ordersService: OrdersService,
  ) {
    this.orders = this.ordersService.getOrders();
  }

  ngOnInit() {

  }

}
