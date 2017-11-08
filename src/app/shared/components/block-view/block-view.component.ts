
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlockViewService } from './block-view.service';
import { popup } from '@shared/animation';
import { AutoDestroy } from '@shared/base/auto.destroy';

export interface BlockViewModel {
  /**
   * true is show
   */
  isShow: boolean;
  /**
   * word for waiting
   */
  title?: string;
}

@Component({
  selector: 'app-block-view',
  templateUrl: './block-view.component.html',
  styleUrls: ['./block-view.component.css'],
  animations: [
    popup(150, 300)
  ]
})
export class BlockViewComponent extends AutoDestroy implements OnInit {

  /**
   * controle blockview show obj
  */
  public blockViewObject: BlockViewModel = { isShow: false, title: 'Loading' };

  constructor(
    private _blockViewService: BlockViewService
  ) { super(); }

  ngOnInit() {
    this._blockViewService.datachanged
      .takeUntil(this._destroy$)
      .subscribe(
      data => {
        this.blockViewObject = data;
      });
  }

}
