import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { AuthService } from './../../../services/auth.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  errorMessage
  lWantRegister: boolean = false;
  constructor(public auth: AuthService, private _router:Router) {  //private _api: ApiService, , public _loginService:LoginService

  }

  ngOnInit() {
    this.lWantRegister = false;
    this.auth.isUserLogin();
    this.auth.isLoginFail = false;
  }

  switchRegisterBool(){
    this.lWantRegister = !this.lWantRegister;
  }
}

