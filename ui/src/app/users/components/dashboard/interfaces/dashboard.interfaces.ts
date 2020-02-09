export interface Order {
  analisysType: string[];
  patients: string[];
  address: string;
  location: string;
  equipment: string[];
}

export interface SortedOrders {
  new: Order[];
  in_progress: Order[];
  completed: Order[];
}
