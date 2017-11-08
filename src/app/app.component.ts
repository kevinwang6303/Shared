import { Component } from '@angular/core';
import { PopUpService } from '@shared/components/pop-up2/pop-up.service';
import swal from 'sweetalert2';
import { TestPopupComponent } from './components/test-popup/test-popup.component';
import { BlockViewService } from '@shared/components/block-view/block-view.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    private _pop: PopUpService,
    private _blockViewService: BlockViewService
  ) { }

  goalert() {
    swal({
      title: '錯誤訊息!!!',
      text: '伺服器發生錯誤，請聯絡管理者!',
      type: 'error'
    });
  }

  openPopup() {
    this._pop.open(
      TestPopupComponent,
      {
        moduleName: 'AppModule',
        disableClose: true
      }
    );
  }

  goblock() {
    this._blockViewService.block();
  }
}
