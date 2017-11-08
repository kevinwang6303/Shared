import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AnimationTransitionEvent
} from '@angular/core';
import { AutoDestroy } from '@shared/base/auto.destroy';
import { EventService } from '@shared/service';
import { popup } from '@shared/animation';

export interface PopUpModel {
  isShow: boolean;
  title?: string;
}

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.sass'],
  animations: [
    popup()
  ]
})
export class PopUpComponent extends AutoDestroy implements OnInit {

  /**
   * controle popup show obj
   * isShow = true is show
   * title is the word for this present popup title
  */
  popUpObject: PopUpModel = { isShow: false, title: '' };

  /**
   * if you need close btn，set this for true
   */
  @Input() closeBtn = false;

  /**
   * set this for true，key up esc or click every where can close this popup
   */
  @Input() autoClose = false;

  /**
   * you can do any thing when close popup
   */
  @Output() callBackFun: EventEmitter<any> = new EventEmitter();


  constructor(
    private _eventService: EventService
  ) { super(); }

  ngOnInit() {

    if (this.autoClose) {
      this._eventService.keydownEvent_Exit
        .takeUntil(this._destroy$)
        .subscribe(
        bool => {
          if (bool) {
            this.popUpObject = { isShow: false };
          }
        });
    }
  }

  open(title?) {
    this.popUpObject.title = title;
    this.popUpObject.isShow = true;

    if (this.autoClose) {
      this._eventService.keydownEvent_Exit
        .takeUntil(this._destroy$)
        .subscribe(
        bool => {
          if (bool) {
            this.close();
          }
        });
    }
  }

  close() {
    this.popUpObject.isShow = false;
  }

  // Alan:when animation done do this
  animationDone(event: AnimationTransitionEvent) {
    // Alan: if the from state is null
    if (!event.fromState) {
      // Alan: if there is an callBackfunction, then callback
      if (this.callBackFun) {
        this.callBackFun.emit();
      }
    }
  }


}
