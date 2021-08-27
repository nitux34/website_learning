import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { GalleryService } from 'src/app/services/gallery.service';
import { first } from "rxjs/operators";
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit { 
  constructor(private _api: ApiService, public gallery: GalleryService) { }
  errorMessage
  galleryList 
  tmpImages: any = []
/*     [{
      "username": "test",
      "id": "4",
    }]; */
  ngOnInit(): void {    
    this.getGalleryList();
    


  }

  getGalleryList(): void{
    this.gallery.getGalleryList().subscribe((res: any)=> {
      this.galleryList = res.data;
      //console.log(res.data)
      //this.getImages("1");
      this.galleryList.forEach(art => {
        this.getImages(art.id);
      });
    });
  }
  getImages(id){
    this._api.getBlobRequest('content/image',id).subscribe((res: any) => { 
    console.log(res)
    const reader = new FileReader(); 
    if (res){
      reader.readAsDataURL(res); //FileStream response from .NET core backend
      reader.onload = _event => {
        this.tmpImages[id] = reader.result; // problems with large arrays?
      };
    }      
  });
  }
}
