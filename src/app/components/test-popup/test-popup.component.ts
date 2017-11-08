import { Component, OnInit, Input } from '@angular/core';
import { PopUpRef } from '@shared/components/pop-up2/pop-up.model';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-test-popup',
  templateUrl: './test-popup.component.html',
  styleUrls: ['./test-popup.component.css']
})
export class TestPopupComponent implements OnInit, PopUpRef {
  public popupTitle = `<span>搜尋</span>`;
  @Input() popupInputData;
  public popupOutputSender: Subject<any> = new Subject();

  constructor() { }

  ngOnInit() {
  }

}
