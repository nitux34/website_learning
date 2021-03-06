import { ApiService } from './api.service'
import { NgForm } from '@angular/forms'; 
import { Router } from '@angular/router';
import { Injectable} from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService  {
  public isLogin: boolean = false
  public isLoginFail: boolean = false
  public userList 
  errorMessage
  constructor(public _api:ApiService, private _router:Router) { 
  }
  getUserDetails() {
    // console.log(JSON.parse(localStorage.getItem('userData')));
    return localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null;
  }
  setDataInLocalStorage(variableName, data) {
    localStorage.setItem(variableName, data);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  clearStorage() {
    localStorage.clear();
    this.isUserLogin();
  }

//-------
  logSubmit(form: NgForm, nodePath) {  
    this._api.postTypeRequest(nodePath, form.value).subscribe((res: any) => { //'user/login'
      console.log(res);
      if (res.status) { 
       this.setDataInLocalStorage('userData', JSON.stringify(res.data)); 
       this.isUserLogin();    
        if (!this.isLogin){        
          this.setDataInLocalStorage('token', res.token); 
          this._router.navigate(['login']); 
          this.isLoginFail = true;
        } else {
          this.isLoginFail = false;
        }
     } else { 
       alert(res.msg) 
     } 
   }, err => { 
     this.errorMessage = err['error'].message; 
   }); 
 } 
 
  isUserLogin(){ 
    if (this.getUserDetails() != null && this.getUserDetails().length!=0) { 
      this.isLogin = true; 
    } else {
      this.isLogin = false;
    }
  }

  logout(){
    this.clearStorage();
    this._router.navigate(['login']);
  }


  getUserList(){    
    /* this._api.getTypeRequest('user/list').subscribe((res: any) => {   
      console.log("getUserList hi")     
      this.userList = (res.data);
      return res.data
    });  */
    //var tmp = this._api.getTypeRequest('user/list');
    //console.log("tmp",tmp)
    return this._api.getTypeRequest('user/list')
  }
}