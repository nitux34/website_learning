

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GalleryService } from 'src/app/services/gallery.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser'; //, private sanitizer: DomSanitizer
import {baseBackendUrl,artworkFolder} from 'src/app/global-variables';

@Component({
  selector: 'app-artwork',
  templateUrl: './artwork.component.html',
  styleUrls: ['./artwork.component.sass']
})
export class ArtworkComponent implements OnInit {

  constructor( private route: ActivatedRoute,public router: Router, public auth:AuthService, public gallery:GalleryService, private sanitizer: DomSanitizer) { }
  tmpArt: any = [];
  fullGalleryList
  tmpImage
  baseBackendUrl = baseBackendUrl;
  artworkFolder = artworkFolder;
  ngOnInit(): void { 
    
    this.getGalleryList(); 
  }

  /* goToList(){ //NEVER USED?
    this.router.navigate(['/list']);
  } */

  getGalleryList(): void{
      this.gallery.getGalleryList().subscribe((res: any)=> {
        this.fullGalleryList = res.data;
        this.getArt();
      } );
  }
  getArt() {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    if (this.fullGalleryList!=null){   
        this.tmpArt = this.fullGalleryList.find(e => e.id === id);   
        this.tmpArt.path_image = baseBackendUrl.concat(artworkFolder).concat(this.tmpArt.path_image);
        //this.getImage(id);     
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

  /* getImage(id){
    this.auth._api.getBlobRequest('content/image',id).subscribe((res: any) => {   
      console.log(res)
      const reader = new FileReader(); 
      if (res){
        reader.readAsDataURL(res); //FileStream response from .NET core backend
        reader.onload = _event => {
          this.tmpImage = reader.result; 
        };
      } 
    }); 
  } */

}

