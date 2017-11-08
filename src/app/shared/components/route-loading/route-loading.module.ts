import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteLoadingComponent } from './route-loading.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RouteLoadingComponent
  ],
  exports: [
    RouteLoadingComponent
  ]
})
export class RouteLoadingModule { }
