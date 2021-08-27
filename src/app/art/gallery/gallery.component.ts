import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { GalleryService } from 'src/app/services/gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.sass']
})
export class GalleryComponent implements OnInit {

  constructor(private _api: ApiService, public gallery: GalleryService) { }
  errorMessage
  galleryList 
  tmpImages: any = []
  allArtId
  ngOnInit(): void {    
    this.getGalleryList();
  }

  getGalleryList(): void{
    this.gallery.getGalleryList().subscribe((res: any)=> {
      this.galleryList = res.data;
      this.galleryList.forEach(art => {
        this.allArtId.push(art.id);
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
