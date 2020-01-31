import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ]
})
export class SharedModule { }
