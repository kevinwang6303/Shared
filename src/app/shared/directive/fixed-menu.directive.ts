import { Directive, OnInit, Input, ElementRef } from '@angular/core';
import { EventService } from '../service/event.service';
import { AutoDestroy } from '@shared/base/auto.destroy';

@Directive({
  selector: '[appFixedMenu]'
})
export class FixedMenuDirective extends AutoDestroy implements OnInit {

  @Input() appFixedMenu: string;
  @Input() howFixed: string;

  constructor(
    private _elem: ElementRef,
    private _EventService: EventService
  ) {
    super();
  }

  ngOnInit() {
    this._EventService.scrollEvent
      .takeUntil(this._destroy$)
      .map(e => this.conditions())
      .subscribe(bool => {
        if (bool) {
          this._elem.nativeElement.classList.add(this.appFixedMenu);
        } else {
          this._elem.nativeElement.classList.remove(this.appFixedMenu);
        }
      });
  }

  private conditions() {
    switch (this.howFixed) {
      case 'scroll':
        return this._elem.nativeElement.parentElement.getBoundingClientRect().top < 0;
      case 'top':
        return window.scrollY > 0;
    }
  }

}
