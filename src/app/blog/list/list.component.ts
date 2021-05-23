import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit { 
  constructor(private _api: ApiService, public auth: AuthService) { }
  errorMessage
  ngOnInit(): void {    
    this.auth.getUserList();
  }
}
