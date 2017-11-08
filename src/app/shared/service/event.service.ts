import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EventService {

  public scrollEvent = Observable.fromEvent(document, 'scroll');
  public mouseMove = Observable.fromEvent(document, 'mousemove');
  public touchMove = Observable.fromEvent(document, 'touchmove');
  public keydownEvent_Exit = Observable.fromEvent(document, 'keydown')
    .filter((event: KeyboardEvent) => {
      return event.keyCode === 27;
    });

  constructor() { }

}
