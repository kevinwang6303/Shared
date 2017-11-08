import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { BlockViewService } from '@shared/components/block-view/block-view.service';
import { NotFoundError, BadError, AppError } from '../model/app-error.model';
import swal from 'sweetalert2';

@Injectable()
export class BaseService {

  constructor(
    private http: HttpClient,
    private blockViewService: BlockViewService
  ) { }

  getMethod(url: string, blockView = false, contentType?: string) {

    const getMethod = this.http.get(url, { headers: this.getHeaders(contentType) });

    return blockView ? this.next(getMethod) : this.noBlockNext(getMethod);

  }

  postMethod(url: string, obj: any, blockView = false, contentType?: string) {

    const postMethod = this.http.post(url, obj, { headers: this.getHeaders(contentType) });

    return blockView ? this.next(postMethod) : this.noBlockNext(postMethod);

  }

  deleteMethod(url: string, id: any, blockView = false, contentType?: string) {

    const deleteMethod = this.http.delete(`${url}/${id}`, { headers: this.getHeaders(contentType) });

    return blockView ? this.next(deleteMethod) : this.noBlockNext(deleteMethod);

  }

  putMethod(url: string, obj: any, blockView = false, contentType?: string) {

    const putMethod = this.http.put(url, obj, { headers: this.getHeaders(contentType) });

    return blockView ? this.next(putMethod) : this.noBlockNext(putMethod);

  }

  downLoadMethod(
    url: string,
    obj?: any,
    blockView = false,
    contentType?: string
  ) {

    const downLoadMethod = this.http.post(url, obj, { headers: this.getHeaders(contentType), responseType: 'blob' });

    return blockView ? this.next(downLoadMethod) : this.noBlockNext(downLoadMethod);
  }


  downLoadMethodForGet(
    url: string,
    obj?: any,
    blockView = false,
    contentType?: string
  ) {

    const downLoadMethod = this.http.get(url, { headers: this.getHeaders(contentType), responseType: 'blob' });

    return blockView ? this.next(downLoadMethod) : this.noBlockNext(downLoadMethod);
  }

  getHeaders(contentType: string = 'application/json'): HttpHeaders {
    const headers = new HttpHeaders()
      .set('authorization', `Bearer ${sessionStorage.getItem('token') ? sessionStorage.getItem('token') : ''}`)
      .set('Content-Type', contentType);

    return headers;
  }

  private next(methood: any) {
    this.blockViewService.block();
    return methood.do(() => {
      this.blockViewService.unblock();
    }).catch((error: Response) => {
      this.blockViewService.unblock();
      this.handleError(error);
    });
  }


  private noBlockNext(methood: any) {
    return methood.catch((error: Response) => {
      this.handleError(error);
    });
  }

  private handleError(error: Response) {

    if (error.status === 404) {
      swal({
        title: '錯誤訊息!!!',
        text: '伺服器發生404錯誤，請聯絡管理者!',
        type: 'error'
      });
      return Observable.throw(new NotFoundError());
    }

    if (error.status === 400) {
      swal({
        title: '錯誤訊息!!!',
        text: '伺服器發生400錯誤，請聯絡管理者!',
        type: 'error'
      });
      return Observable.throw(new BadError(error.json()));
    }

    if (error.status === 401) {
      swal({
        title: '錯誤訊息!!!',
        text: '伺服器發生401錯誤，請聯絡管理者!',
        type: 'error'
      });
      return Observable.throw(new BadError(error.json()));
    }

    if (error.status === 403) {
      swal({
        title: '錯誤訊息!!!',
        text: '您沒有權限，將回首頁',
        type: 'error'
      }).then(
        () => {
          // this.dbAuthService.noAuthority();
        });

      return Observable.throw(new BadError(error.json()));
    }

    swal({
      title: '錯誤訊息!!!',
      text: '伺服器發生錯誤，請聯絡管理者!',
      type: 'error'
    });
    return Observable.throw(new AppError(error));
  }

}

/* service.getMethod(url).subscribe(
    (data) => {
      this.data = data
    },
    (error: AppError) => {
      if(error instanceof NotFoundError){
        alert('already been delete');
      }else if(error instanceof BadError){
        alert('An unexpected error occurred');
      }else {
        throw error;
      }
    }
  )
*/

/*Observable.combineLatest([
  this.route.paramMap,
  this.route.queryParamMap
])
.switchMap(
   combined =>{
    let id = combined[0].get('id');
    let page = combined[1].get('page');
    this.service.get()
  })
.subscribe(
  resData =>{
    this.data = resData
  })
*/
