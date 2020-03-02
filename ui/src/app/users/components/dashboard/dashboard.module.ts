import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { SharedModule } from '../../../shared/shared.module';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { OrdersComponent } from './components/orders/orders.component';
import { SearchFacilityDialogComponent } from './components/search-facility-dialog/search-facility-dialog.component';
import { DoctorsListComponent } from './components/doctors-list/doctors-list.component';

@NgModule({
  declarations: [
    OrdersListComponent,
    AccountInfoComponent,
    OrdersComponent,
    SearchFacilityDialogComponent,
    DoctorsListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    DashboardRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAi4Tmx52GBkgZNU2jbhGYxRt2WbdAhQxU',
      libraries: ['places']
    }),
  ],
  entryComponents: [
    SearchFacilityDialogComponent,
  ]
})
export class DashboardModule { }
