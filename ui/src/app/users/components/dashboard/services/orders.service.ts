import { Injectable } from '@angular/core';
import { Order, SortedOrders } from '../interfaces/dashboard.interfaces';

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
            patients: ['john black', 'Joe White'],
            address: 'Ambulance №333',
            location: '103 105',
            equipment: ['syringe', 'ice', 'bucket'],
          }, {
            analisysType: ['urine'],
            patients: ['john black', 'Joe White'],
            address: 'Ambulance №333',
            location: '103 105',
            equipment: ['syringe', 'ice', 'bucket'],
          }, {
            analisysType: ['urine'],
            patients: ['john black', 'Joe White'],
            address: 'Ambulance №333',
            location: '103 105',
            equipment: ['syringe', 'ice', 'bucket'],
          },
        ],
        in_progress: [
          {
            analisysType: ['urine'],
            patients: ['john black', 'Joe White'],
            address: 'Ambulance №322',
            location: '103 105',
            equipment: ['syringe', 'ice', 'bucket'],
          }, {
            analisysType: ['urine'],
            patients: ['john black', 'Joe White'],
            address: 'Ambulance №322',
            location: '103 105',
            equipment: ['syringe', 'ice', 'bucket'],
          }, {
            analisysType: ['urine'],
            patients: ['john black', 'Joe White'],
            address: 'Ambulance №322',
            location: '103 105',
            equipment: ['syringe', 'ice', 'bucket'],
          },
        ],
        completed: [
          {
            analisysType: ['urine'],
            patients: ['john black', 'Joe White'],
            address: 'Ambulance №311',
            location: '103 105',
            equipment: ['syringe', 'ice', 'bucket'],
          }, {
            analisysType: ['urine'],
            patients: ['john black', 'Joe White'],
            address: 'Ambulance №311',
            location: '103 105',
            equipment: ['syringe', 'ice', 'bucket'],
          }, {
            analisysType: ['urine'],
            patients: ['john black', 'Joe White'],
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
}
