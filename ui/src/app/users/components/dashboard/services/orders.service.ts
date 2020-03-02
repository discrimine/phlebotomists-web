import { Injectable } from '@angular/core';
import { Order, SortedOrders } from '../interfaces/dashboard.interfaces';
import { of, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  public orders: SortedOrders;

  constructor() {
    this.orders = {
        new: [
          {
            analisysType: ['urine'],
            patients: ['john john', 'Joe Joe'],
            address: 'Ambulance №333',
            location: '103 105',
            equipment: ['syringe', 'ice', 'bucket'],
          }, {
            analisysType: ['urine'],
            patients: ['john john', 'Joe Joe'],
            address: 'Ambulance №333',
            location: '103 105',
            equipment: ['syringe', 'ice', 'bucket'],
          }, {
            analisysType: ['urine'],
            patients: ['john john', 'Joe Joe'],
            address: 'Ambulance №333',
            location: '103 105',
            equipment: ['syringe', 'ice', 'bucket'],
          },
        ],
        in_progress: [
          {
            analisysType: ['urine'],
            patients: ['john john', 'Joe Joe'],
            address: 'Ambulance №322',
            location: '103 105',
            equipment: ['syringe', 'ice', 'bucket'],
          }, {
            analisysType: ['urine'],
            patients: ['john john', 'Joe Joe'],
            address: 'Ambulance №322',
            location: '103 105',
            equipment: ['syringe', 'ice', 'bucket'],
          }, {
            analisysType: ['urine'],
            patients: ['john john', 'Joe Joe'],
            address: 'Ambulance №322',
            location: '103 105',
            equipment: ['syringe', 'ice', 'bucket'],
          },
        ],
        completed: [
          {
            analisysType: ['urine'],
            patients: ['john john', 'Joe Joe'],
            address: 'Ambulance №311',
            location: '103 105',
            equipment: ['syringe', 'ice', 'bucket'],
          }, {
            analisysType: ['urine'],
            patients: ['john john', 'Joe Joe'],
            address: 'Ambulance №311',
            location: '103 105',
            equipment: ['syringe', 'ice', 'bucket'],
          }, {
            analisysType: ['urine'],
            patients: ['john john', 'Joe Joe'],
            address: 'Ambulance №311',
            location: '103 105',
            equipment: ['syringe', 'ice', 'bucket'],
          },
        ],
    };

  }

  public getOrders(): SortedOrders {
    return this.orders || { new: [], in_progress: [], completed: [] };
  }

  public setOrders(orders: SortedOrders): void {
    this.orders = orders;
  }

  public addNewOrder(order: Order): Observable<SortedOrders> {
    this.orders.new.push(order);
    return of(this.orders);
  }
}
