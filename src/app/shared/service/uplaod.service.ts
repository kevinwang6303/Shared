import { Injectable } from '@angular/core';
import { NgxfUploaderService, UploadEvent, UploadStatus, FileError } from 'ngxf-uploader';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class UplaodService {

  process: number[] = [];
  fileData: File;

  constructor(private Upload: NgxfUploaderService) { }

  // non-multiple, return File
  uploadFile(file: File | FileError) {
    if (!(file instanceof File)) {
      this.alertError(file);
      return;
    }
    return this.Upload.upload({
      url: '/api/DI/UploadDi',
      headers: new HttpHeaders().set('authorization', `Bearer ${sessionStorage.getItem('token') ? sessionStorage.getItem('token') : ''}`),
      /*params: new HttpParams().set('test', '123'), // Option
      fields: { // Option
        toUrl: 'device'
      },
      filesKey: 'MMSUploadFile', */
      files: file,
      process: true
    });
    /*.subscribe(
      (event: UploadEvent) => {
        console.log(event);
      },
      (err) => {
        console.log(err);
      },
      () => {
        console.log('complete');
      });*/
  }

  // multiple, return  File[]
  uploadFileList(files: File[]) {
    if (!(files instanceof Array)) {
      this.alertError(files);
      return;
    }

    return this.Upload.upload({
      url: 'your upload url',
      /*headers: { Authorization: 'some-token' },
      params: { test: 'aaa', test2: 'bbb' },
      fields: {
        toUrl: 'device'
      },*/
      files: files,
      filesKey: ['key1', 'key2', 'key3'],
      process: true
    });
    /*.subscribe(
      (event: UploadEvent) => {
        if (event.status === UploadStatus.Uploading) {
          console.log(event.percent);
        } else {
          console.log(event);
        }
      },
      (err) => {
        console.log(err);
      },
      () => {
        console.log('complete');
      });*/
  }

  // Do something you want when file error occur.
  alertError(msg: FileError) {
    switch (msg) {
      case FileError.NumError:
        alert('Number Error');
        break;
      case FileError.SizeError:
        alert('Size Error');
        break;
      case FileError.TypeError:
        alert('Type Error');
        break;
    }
  }

}
