import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.sass']
})
export class PreviewComponent implements OnInit {
  constructor( private route: ActivatedRoute,public router: Router, public auth:AuthService) { }
  tmpUser
  ngOnInit(): void { 
    
    this.getUser();
  }

  goToList(){ 
    this.router.navigate(['/list']);
  }

  getUser() {
    // this.auth.getUserList(); 
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    if (this.auth.userList!=null){   
        this.tmpUser = this.auth.userList.find(e => e.id === id);
    }
  }
}
