import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { DoctorsListComponent } from './components/doctors-list/doctors-list.component';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'account-info',
        component: AccountInfoComponent,
      },
      {
        path: 'orders-list',
        component: OrdersListComponent,
      },
      {
        path: 'doctors-list',
        component: DoctorsListComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class DashboardRoutingModule {
}
