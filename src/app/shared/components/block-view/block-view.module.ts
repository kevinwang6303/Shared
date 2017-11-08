import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockViewComponent } from './block-view.component';
import { BlockViewService } from './block-view.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BlockViewComponent
  ],
  exports: [
    BlockViewComponent
  ]
})

export class BlockViewModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: BlockViewModule,
      providers: [
        BlockViewService
      ]
    };
  }
}
