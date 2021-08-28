import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GalleryService } from 'src/app/services/gallery.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser'; //, private sanitizer: DomSanitizer
//import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.sass']
})
export class PreviewComponent implements OnInit {
  constructor( private route: ActivatedRoute,public router: Router, public auth:AuthService, public gallery:GalleryService, private sanitizer: DomSanitizer, private _api: ApiService) { }
  tmpArt
  artList
  tmpImage
  tmpBlogpost
  fileName = '';


  ngOnInit(): void { 
    
    this.getGalleryList(); 
    this.getBlogpost();
  }

  /* goToList(){ //NEVER USED?
    this.router.navigate(['/list']);
  } */

  getGalleryList(): void{
      this.gallery.getGalleryList().subscribe((res: any)=> {
        this.artList = res.data;
        this.getArt();
      } );
  }
  getArt() {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    if (this.artList!=null){   
        this.tmpArt = this.artList.find(e => e.id === id);   
        this.getImage(id);     
    }    
  }

 /*   getImage(){    
     // Set URL for Image from Blob data
    /* SANTIZE? (See first link)
    https://stackoverflow.com/questions/51019467/convert-blob-to-image-url-and-use-in-image-src-to-display-image
     https://stackoverflow.com/questions/55591871/view-blob-response-as-image-in-angular*//*
    this.auth._api.getBlobRequest('content/image',1).subscribe((res: any) => {      
      const reader = new FileReader(); 
      if (res){
        reader.readAsDataURL(res); //FileStream response from .NET core backend
        reader.onload = _event => {
          this.tmpImage = reader.result; 
        };
      } 
    });         
  }  */

  getImage(id){
    this._api.getBlobRequest('content/image',id).subscribe((res: any) => {   
      const reader = new FileReader(); 
      if (res){
        reader.readAsDataURL(res); //FileStream response from .NET core backend
        reader.onload = _event => {
          this.tmpImage = reader.result; 
        };
      } 
    }); 
  }

  getBlogpost() {
    this._api.getBlobRequest('content/blogpost',0).subscribe((res: any) => {  
      const reader = new FileReader(); 
      if (res){
        //reader.readAsDataURL(res); //FileStream response from .NET core backend
        reader.readAsText(res);
        reader.onload = _event => {
          this.tmpBlogpost = reader.result; 
        };
      } 
    });
  }

  onFileSelected(event) {

    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;

        const formData = new FormData();

        formData.append("thumbnail", file);
        const upload$ = this._api.postTypeRequest("uploader/upload",formData); // 
        upload$.subscribe();
    }
}
}
