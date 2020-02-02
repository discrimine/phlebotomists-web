import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { OrdersComponent } from './components/orders/orders.component';

@NgModule({
  declarations: [
  OrdersListComponent,
  AccountInfoComponent,
  OrdersComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    DashboardRoutingModule,
  ],
  providers: [
  ],
})
export class DashboardModule { }
