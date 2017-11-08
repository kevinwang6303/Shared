import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';
@Pipe({
  name: 'dateToChinesedate'
})
export class DateToChinesedatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return;
    }
    const tempMonth = moment(value).month() + 1;
    const month = tempMonth < 10 ? `0${tempMonth}` : tempMonth;
    const day = moment(value).date() < 10 ? `0${moment(value).date()}` : moment(value).date();
    const hours = moment(value).hours() < 10 ? `0${moment(value).hours()}` : moment(value).hours();
    const minutes = moment(value).minutes() < 10 ? `0${moment(value).minutes()}` : moment(value).minutes();
    const seconds = moment(value).seconds() < 10 ? `0${moment(value).seconds()}` : moment(value).seconds();

    return args ?
      `${moment(value).year() - 1911}/${month}/${day} ${hours}:${minutes}:${seconds}`
      : `${moment(value).year() - 1911}/${month}/${day}`;
  }

}
