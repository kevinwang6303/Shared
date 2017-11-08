import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appViewContainer]'
})
export class ViewContainerDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }
}
