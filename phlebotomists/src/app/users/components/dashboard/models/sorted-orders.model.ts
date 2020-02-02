import { Order } from '../interfaces/dashboard.interfaces';

export class SortedOrders {

  public new: Order[];
  public InProgres: Order[];
  public completed: Order[];

  constructor(newest: Order[], inProgress: Order[], completed: Order[]) {
    this.new = newest || [];
    this.InProgres = inProgress || [];
    this.completed = completed || [];
  }
}