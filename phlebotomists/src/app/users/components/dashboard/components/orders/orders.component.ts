import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../../interfaces/dashboard.interfaces';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  @Input() orders: Order[];

  constructor() { }

  ngOnInit() {
  }

}
