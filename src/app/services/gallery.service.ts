import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
//import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(public _api:ApiService) { }

  getGalleryList(){    
    return this._api.getTypeRequest('content/list')
  }
}
