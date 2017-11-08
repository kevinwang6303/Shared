import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlockViewModule } from './components/block-view/block-view.module';
import { MyPaginationModule } from './components/my-pagination/my-pagination.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReallyPaginationModule } from './components/really-pagination/really-pagination.module';
import { PopUpModule } from '@shared/components/pop-up2/pop-up.module';

import {
  PopUpComponent
} from './components';

import {
  FixedMenuDirective,
  EqualValidatorDirective
} from './directive';


import {
  SummaryPipe,
  DateToChinesedatePipe,
  SafePipe
} from './pipe';

import {
  EventService,
  UplaodService
} from './service';


const SHARE_DIRECTIVES = [
  FixedMenuDirective,
  EqualValidatorDirective
];

const SHARE_PIPES = [
  SummaryPipe,
  DateToChinesedatePipe,
  SafePipe
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BlockViewModule,
    MyPaginationModule,
    ReallyPaginationModule,
    PopUpModule
  ],
  declarations: [
    SHARE_DIRECTIVES,
    PopUpComponent,
    SHARE_PIPES
  ],
  exports: [
    PopUpComponent,
    MyPaginationModule,
    ReallyPaginationModule,
    SHARE_DIRECTIVES,
    SHARE_PIPES
  ],
  providers: []
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: SharedModule,
      providers: [
        EventService,
        UplaodService
      ]
    };
  }
}

