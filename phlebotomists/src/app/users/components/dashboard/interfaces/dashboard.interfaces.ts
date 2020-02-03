export interface Order {
  analisysType: 'urine' | 'stool' | 'venipuncture';
  patients: string[];
  facility: string;
  location: string;
  equipment: string[];
}

export interface SortedOrders {
  new: Order[];
  in_progress: Order[];
  completed: Order[];
}
