import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit{
  title = 'my-simple-angular';
  constructor(public auth:AuthService){

  }

  ngOnInit() {
    this.auth.isUserLogin();    
  }
}
