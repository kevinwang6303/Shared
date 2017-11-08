import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/concatAll';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/withLatestFrom';

import { HttpClientModule } from '@angular/common/http';
import { ComponentFactoryResolver, Injector, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlockViewModule } from '@shared/components/block-view/block-view.module';
import { PopUpModule } from '@shared/components/pop-up2/pop-up.module';
import { PopUpService } from '@shared/components/pop-up2/pop-up.service';
import { RouteLoadingModule } from '@shared/components/route-loading/route-loading.module';
import { SharedModule } from '@shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxfUploaderModule } from 'ngxf-uploader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestPopupComponent } from './components/test-popup/test-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    TestPopupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouteLoadingModule,
    NgxPaginationModule,
    PopUpModule.forRoot(),
    BlockViewModule.forRoot(),
    NgxfUploaderModule.forRoot(),
    SharedModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    TestPopupComponent
  ]
})
// export class AppModule { }
export class AppModule {
  constructor(
    private _pop: PopUpService,
    private _factory: ComponentFactoryResolver,
    private _injector: Injector
  ) {
    _pop.pushModuleFactory('AppModule', _factory, _injector);
  }
}
