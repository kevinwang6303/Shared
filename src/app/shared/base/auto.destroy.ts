import { Subject } from 'rxjs/Subject';
import { OnDestroy } from '@angular/core';

export abstract class AutoDestroy implements OnDestroy {
  protected _destroy$ = new Subject<any>();

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
