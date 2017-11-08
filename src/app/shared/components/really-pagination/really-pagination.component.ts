import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-really-pagination',
  templateUrl: './really-pagination.component.html',
  styleUrls: ['./really-pagination.component.css']
})
export class ReallyPaginationComponent implements OnInit {

  @Input() pageModel;
  @Output() changeValue: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  inputPage(page: number) {
    this.pageModel.pageIndex = this.pageModel.allCount < page ? this.pageModel.allCount : +page;

    this.changeValue.emit(this.pageModel);
  }

  inputCount(count: number) {
    this.pageModel.pageCount = +count;
    this.changeValue.emit(this.pageModel);
  }

  changeCount(count: number) {
    this.pageModel.pageCount = +count;
    this.pageModel.pageIndex = 1;
    this.changeValue.emit(this.pageModel);
  }
}
