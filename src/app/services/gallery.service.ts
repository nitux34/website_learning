import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
//import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(public _api:ApiService) { }

  get galleryList(){    
    return this._api.getTypeRequest('content/list')
  }
}
