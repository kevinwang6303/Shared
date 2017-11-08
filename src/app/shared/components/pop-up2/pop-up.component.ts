import { Component, OnInit } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { PopUpService } from './pop-up.service';
import { PopUpModel } from './pop-up.model';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { AutoDestroy } from '@shared/base/auto.destroy';
import { animateFactory } from '../../animation/index';

@Component({
  selector: 'app-pop-up-container',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
  animations: [
    animateFactory(`150ms 0ms linear`)
  ]
})
export class PopUpComponent extends AutoDestroy implements OnInit {

  listObject: PopUpModel[] = [];
  private keyExit$: Subscription;

  constructor(private _popUpService: PopUpService) { super(); }

  ngOnInit() {
    this._popUpService.dataChanged
      .takeUntil(this._destroy$)
      .subscribe(
      (data: PopUpModel | null) => {
        if (data) { this.addItem(data); }
      });
  }

  // add poplist
  private addItem(data: PopUpModel) {
    this.addExitButton(data);
    this.listObject.push(data);
  }

  public deleteItem(obj: { data: any, index: number }) {
    this.listObject[obj.index].sendData = obj.data;

    this.listObject.splice(obj.index, 1);
    this.removeExitButton();
  }

  // When close done.
  closeDone(event: AnimationEvent, index: number, data?: any) {
    // console.log(event);
    if (event.toState === 'void') {
      this._popUpService.handelCallBack(index, data);
    }
  }

  private addExitButton(data: PopUpModel) {
    if (!this.keyExit$ && data.config && !data.config.disableClose) {
      this.keyExit$ = Observable.fromEvent(document, 'keydown')
        .filter((event: KeyboardEvent) => {
          return event.keyCode === 27;
        })
        .subscribe(
        () => {
          // console.log('test is it unsubscribe');
          const lastIndex = this.listObject.length - 1;
          const lastItem = this.listObject[lastIndex];
          if (lastItem.config && !lastItem.config.disableClose) {
            this.deleteItem({ data: undefined, index: lastIndex });
          }
        });
    }
  }

  private removeExitButton() {
    if (this.keyExit$ && this.listObject.length === 0) {
      this.keyExit$.unsubscribe();
      this.keyExit$ = undefined;
    }
  }
}
