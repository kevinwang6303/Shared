import { Type } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export class PopUpModel {
  component: Type<PopUpRef>;
  config?: PopUpConfig;
  sendData?: any;
}

export interface PopUpRef {
  popupTitle?: string;
  popupInputData: any;
  popupOutputSender: Subject<any>;
}

export class PopUpCallback {

  _afterClosed: Function = function () { };

  afterClosed(afterClosed: Function): void {
    this._afterClosed = afterClosed;
  }
}

export declare class PopUpConfig {
  title?: string;
  moduleName?: string;
  /** Custom class for the overlay pane. */
  panelClass?: string;
  /** Whether the dialog has a backdrop. */
  hasBackdrop?: boolean;
  /** Custom class for the backdrop, */
  backdropClass?: string;
  /** Whether the user can use escape or clicking outside to close a modal. */
  disableClose?: boolean;
  /** Width of the dialog. */
  width?: string;
  /** Height of the dialog. */
  height?: string;
  marginTop?: string;
  /** Position overrides. */
  // position?: DialogPosition;
  /** Data being injected into the child component. */
  data?: any;
  /** Layout direction for the dialog's content. */
  disableTitle?: boolean;
  disableCloseButton?: boolean;
  animateName?: string;
}
