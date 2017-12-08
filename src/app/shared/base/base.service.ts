import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { BlockViewService } from '@shared/components/block-view/block-view.service';
import { NotFoundError, BadError, AppError } from '../model/app-error.model';
import swal from 'sweetalert2';

@Injectable()
export class BaseService {

  private blockObs$ = Observable.of(1).map(() => this.blockViewService.block());

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
    return this.blockObs$
      .mergeMap(() => methood)
      .do(() => this.blockViewService.unblock())
      .catch((error: Response) => this.handleError(error));
  }


  private noBlockNext(methood: any) {
    return methood
      .catch((error: Response) => this.handleError(error));
  }

  private handleError(error: Response) {
    this.blockViewService.unblock();

    let reqObj = new AppError(error);
    const reqMessage = {
      title: '錯誤訊息!!!',
      text: `伺服器發生${error.status}錯誤，請聯絡管理者`,
      type: 'error'
    };
    switch (error.status) {
      case 400:
      case 401:
        reqObj = new BadError(error.json());
        break;
      case 403:
        reqMessage.text = `您沒有權限，將回首頁`;
        reqObj = new BadError(error.json());
        break;
      case 404:
        reqObj = new NotFoundError();
        break;
      default:
        reqMessage.text = `伺服器發生錯誤，請聯絡管理者`;
    }
    swal(reqMessage);
    return Observable.throw(reqObj);
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
