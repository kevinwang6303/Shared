import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopUpComponent } from './pop-up.component';
import { ViewContainerDirective } from './view-container.directive';
import { PopUpService } from './pop-up.service';
import { PopUpItemComponent } from './pop-up-item/pop-up-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PopUpComponent,
    PopUpItemComponent,
    ViewContainerDirective,
  ],
  exports: [
    PopUpComponent
  ]
})
export class PopUpModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: PopUpModule,
      providers: [PopUpService]
    };
  }
}
