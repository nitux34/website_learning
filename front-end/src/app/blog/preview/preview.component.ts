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
  fileName: string = '';
  formData
  uploadStatus: string ='';
  public baseUrl = 'http://localhost:4000/blogposts'
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

        this.formData = new FormData();

        this.formData.append("data", file);
        
    }
  }

  uploadImgFile(){
    console.log(this.formData)
    const upload$ = this._api.postTypeRequest("uploader/image",this.formData); // 
    upload$.subscribe((res:any) =>{
      
      this.uploadStatus = res.msg;
      this.formData = null;
      this.fileName = null;
      this.uploadMdFile(false);//.next((res) => );
      this.clearStatusText();
      //location.reload(); // If image is added, page needs reload 
    });
  }

  uploadMdFile(lStatus = true){
    var mdFormData = new FormData();
    mdFormData.append("data",this.getEditMarkdownText());
    console.log(mdFormData)
    this._api.postTypeRequest("uploader/md",mdFormData).subscribe((res:any) =>{
      console.log(res)
      if (lStatus){
        this.uploadStatus = res.msg;
      }
      this.clearStatusText();
    });
    //location.reload()
  }
  clearStatusText(){
    //setTimeout(function(){this.uploadStatus = ''; console.log("UP",this.uploadStatus) }, 500);  
    setTimeout(this.clearStatus, 500);  
  }
  get statusText(){
    console.log("Hi")
    return this.uploadStatus;
  }
  clearStatus(){
    console.log("YARR")
    this.uploadStatus = 'asdasd';
  }
  getEditMarkdownText(){
    var textMd = (<HTMLInputElement>document.getElementById('textEditMarkdown')).value;     // Cast the result of getElement... to HTMLInputElement    
    return textMd
  }
}
