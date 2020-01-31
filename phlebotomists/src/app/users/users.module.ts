import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';

import { UsersService } from './services/users.service';

import { SigninComponent } from './components/signin/signin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
  declarations: [
    SigninComponent,
    DashboardComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    FormsModule,
  ],
  providers: [
    UsersService,
  ],
})
export class UsersModule { }
