import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../../interfaces/dashboard.interfaces';
import { ColDef } from "ag-grid-community";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  @Input() orders: Order[];

  columnDefs: ColDef[] = [
    {
      headerName: 'Analisys Type',
      field: 'analisysType',
      editable: true,

    }, {
      headerName: 'Patients',
      field: 'patients',
      editable: true,
    }, {
      headerName: 'Facility',
      field: 'facility',
      editable: true,
    }, {
      headerName: 'Equipment',
      field: 'equipment',
      editable: true,
    }
  ];


  constructor() { }

  ngOnInit() {
  }

}