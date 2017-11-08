import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { environment } from 'environments/environment.prod';

@Component({
  selector: 'app-my-pagination',
  templateUrl: './my-pagination.component.html',
  styleUrls: ['./my-pagination.component.css']
})
export class MyPaginationComponent {

  @ViewChild('p') p;
  @Input() id: string;
  @Input() maxSize = 10;
  @Input()
  get directionLinks(): boolean {
    return this._directionLinks;
  }
  set directionLinks(value: boolean) {
    this._directionLinks = !!value && <any>value !== 'false';
  }
  @Input()
  get autoHide(): boolean {
    return this._autoHide;
  }
  set autoHide(value: boolean) {
    this._autoHide = !!value && <any>value !== 'false';
  }
  @Input() previousLabel = 'Previous';
  @Input() nextLabel = 'Next';
  @Input() screenReaderPaginationLabel = 'Pagination';
  @Input() screenReaderPageLabel = 'page';
  @Input() screenReaderCurrentLabel = `You're on page`;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  @Input() perPageNum: number = environment.defaultPerPageNum;

  @Output() perPageChange: EventEmitter<number> = new EventEmitter<number>();

  @Input() totalItems: number;

  private _directionLinks = true;
  private _autoHide = false;

  constructor(
  ) {

  }

  emitPerPage() {

    // Alan:小於0或不是數字就丟1出去
    if (this.perPageNum <= 0 || isNaN(this.perPageNum)) {
      this.perPageChange.emit(1);
    } else {
      this.perPageChange.emit(this.perPageNum);
    }
  }

  next() {
    if (!this.p.isLastPage()) {
      this.p.next();
    }
  }

}


/*
  public currentPage: Number = 1;
  public itemsPerPage: Number = 10;
  public schedules = [1, 2, 3, 4, 5, 6];
*/
