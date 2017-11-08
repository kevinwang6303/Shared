import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';
import { MyPaginationComponent } from './my-pagination.component';
/**
 * 參考來
 * https://github.com/michaelbromley/ng2-pagination
 */
@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule
  ],
  declarations: [
    MyPaginationComponent,
  ],
  exports: [
    MyPaginationComponent,
    NgxPaginationModule
  ]
})
export class MyPaginationModule { }
