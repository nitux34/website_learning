import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { GalleryService } from 'src/app/services/gallery.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.sass']
})
export class GalleryComponent implements OnInit {

  constructor(private _api: ApiService, public gallery: GalleryService,private route: ActivatedRoute, private router: Router) {
    //this.router.routeReuseStrategy.shouldReuseRoute = () => false; // this would otherwise prevent "/gallery/:id" from loading in nextPage() function. however
   }
  errorMessage

  public fullGalleryList  //All items in the gallery
  public pageGalleryList = [] //Items to load on current page
  tmpImages: any = [] //Images to load on current page
  pageNr
  pageNr0
  isNextPage // does a next page exist
  nrPages
  public nextPageRef //href link to load
  public prevPageRef
  
  
  ngOnInit(): void {    
    this.getGalleryList();
  }

  getGalleryList(): void{
    this.pageNr = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.pageNr0 = this.pageNr-1;    
    const nrItemsPage = 6;
    this.nextPageRef = ("/gallery/").concat((this.pageNr+1).toString());
    this.prevPageRef = ("/gallery/").concat((this.pageNr-1).toString());

    this.gallery.getGalleryList().subscribe((res: any)=> {
      console.log(res.data)
      res.status ? this.fullGalleryList = res.data : this.fullGalleryList = [];
      
      this.nrPages = Math.ceil(this.fullGalleryList.length/nrItemsPage);
      for (let ii = this.pageNr0*nrItemsPage; ii < this.fullGalleryList.length && ii < this.pageNr0*nrItemsPage+nrItemsPage; ii++){
        this.pageGalleryList.push(this.fullGalleryList[ii]);
        this.getImages(this.fullGalleryList[ii].id);
      }
        (this.fullGalleryList.length < this.pageNr0*nrItemsPage+nrItemsPage) ? this.isNextPage = false : this.isNextPage = true;
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
