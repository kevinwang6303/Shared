import { Component, Input, OnInit } from '@angular/core';
import { AutoDestroy } from '@shared/base/auto.destroy';
import { popup } from '@shared/animation';

declare var ga: any;

import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';


// Alan:the reference:
// http://stackoverflow.com/questions/37069609/show-loading-screen-when-navigating-between-routes-in-angular-2
@Component({
  selector: 'app-route-loading',
  templateUrl: './route-loading.component.html',
  styleUrls: ['./route-loading.component.css'],
  animations: [
    popup(0, 300)
  ]
})

export class RouteLoadingComponent extends AutoDestroy implements OnInit {

  // Sets initial value to true to show loading spinner on first load
  loading = true;

  constructor(private _router: Router) { super(); }

  ngOnInit() {
    this._router.events
      .takeUntil(this._destroy$)
      .subscribe((event: RouterEvent) => {
        this.navigationInterceptor(event);
      });
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {

    if (event instanceof NavigationStart) {
      this.loading = true;
    }

    if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
      this.loading = false;
      window.scroll(0, 0);
    }
  }
}
