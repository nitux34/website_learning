import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../services/auth.service'
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { UsernameValidator } from '../../../username.validator';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  errorMessage
  lWantRegister: boolean = false;
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3),Validators.maxLength(30), UsernameValidator.cannotContainSpace]),
    email: new FormControl('', [Validators.required, Validators.minLength(6),Validators.maxLength(30), UsernameValidator.cannotContainSpace,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', [Validators.required, Validators.minLength(6),Validators.maxLength(30)])
  });
  constructor(public auth: AuthService, private _router:Router) {  //private _api: ApiService, , public _loginService:LoginService

  }

  ngOnInit() {
    this.lWantRegister = false;
    this.auth.isUserLogin();
    this.auth.isLoginFail = false;
  }

  switchRegisterBool(){
    this.lWantRegister = !this.lWantRegister;
    this.auth.isLoginFail = false;
  }

  

  get f(){

    return this.form.controls;

  }
}

