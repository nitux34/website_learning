import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';//private _http_params: HttpParams
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  baseUrl = 'http://localhost:4000/';
  constructor(public _http: HttpClient) {

  }

  getTypeRequest(url) {
    return this._http.get(`${this.baseUrl}${url}`).pipe(map(res => {
      return res;
    }));
  }

  postTypeRequest(url, payload) {
    return this._http.post(`${this.baseUrl}${url}`, payload).pipe(map(res => {
      return res;
    }));
  }

  putTypeRequest(url, payload) {
    return this._http.put(`${this.baseUrl}${url}`, payload).pipe(map(res => {
      return res;
    }));
  }
  getBlobRequest(url,payload) {
    let params = new HttpParams().set('id',payload); //USE TO SEND DATA TO GET REQUEST 
    return this._http.get(`${this.baseUrl}${url}`, {params:params,responseType: 'blob'}).pipe(map(res => {
      return res;
    }));
    //return this._http.get(`${this.baseUrl}${url}`,{responseType: 'blob'});
  }
}
