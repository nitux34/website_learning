import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser'; //, private sanitizer: DomSanitizer


@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.sass']
})
export class PreviewComponent implements OnInit {
  constructor( private route: ActivatedRoute,public router: Router, public auth:AuthService, private sanitizer: DomSanitizer) { }
  tmpUser
  userList
  tmpImage
  ngOnInit(): void { 
    this.getImage();
    this.getUserList(); 
  }

  goToList(){ 
    this.router.navigate(['/list']);
  }

  getUserList(): void{
      this.auth.getUserList().subscribe((res: any)=> {
        this.userList = res.data;
        this.getUser();
      } );
  }
  getUser() {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    if (this.userList!=null){   
        this.tmpUser = this.userList.find(e => e.id === id);        
    }    
  }

   getImage(){    
     // Set URL for Image from Blob data
    /* SANTIZE? (See first link)
    https://stackoverflow.com/questions/51019467/convert-blob-to-image-url-and-use-in-image-src-to-display-image
     https://stackoverflow.com/questions/55591871/view-blob-response-as-image-in-angular*/
    this.auth._api.getBlobRequest('content/image').subscribe((res: any) => {      
      const reader = new FileReader(); 
      if (res){
        reader.readAsDataURL(res); //FileStream response from .NET core backend
        reader.onload = _event => {
          this.tmpImage = reader.result; 
        };
      } 
    });         
  } 
}
