import { Injectable } from '@angular/core';
import { Http,Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  constructor(public _http: Http) { }
  private _contactUrl = 'https://devcentaurgw.kyriopyrina.com/api/index.php/main/loginClient';
  private _savePasswordUrl = 'https://devcentaurgw.kyriopyrina.com/api/index.php/main/savePassword';
  private _saveAccountDataUrl = 'https://devcentaurgw.kyriopyrina.com/api/index.php/main/saveAccountData';

  
  private _contactUrla = 'https://devcentaurgw.kyriopyrina.com/api/index.php/main/loginAdmin';
    
    sendLogin(value:any){
        
      const body = new URLSearchParams(value);
      body.set('username', value.data[0].username);
      body.set('password', value.data[0].password);
      let headers = new Headers();
      headers.append('Content-Type','application/x-www-form-urlencoded');
      return this._http.post(this._contactUrl, body, {
         headers : headers
      }).map( res => res.json() );

    }
 sendPassword(value:any){
        
      const body = new URLSearchParams(value);
      body.set('username', value.data[0].username);
      body.set('password', value.data[0].password);
      let headers = new Headers();
      headers.append('Content-Type','application/x-www-form-urlencoded');
      return this._http.post(this._savePasswordUrl, body, {
         headers : headers
      }).map( res => res.json() );

    }
    sendAccountData(value:any){
        
      const body = new URLSearchParams(value);
      body.set('username', value.data[0].username);
      body.set('password', value.data[0].password);
      body.set('cell', value.data[0].cell);
      body.set('phone', value.data[0].phone);
      body.set('email', value.data[0].email);

      let headers = new Headers();
      headers.append('Content-Type','application/x-www-form-urlencoded');
      return this._http.post(this._saveAccountDataUrl, body, {
         headers : headers
      }).map( res => res.json() );

    }
    getUserData(){
       return this._http.get('https://devcentaurgw.kyriopyrina.com/api/index.php/main/userdata',{headers : new Headers({ 'Authorization':'Bearer '+localStorage.getItem('secret_key')  })  
        }).map( res => res.json() );
    }

    checkAuth(){
       return this._http.get('https://devcentaurgw.kyriopyrina.com/api/index.php/main/checkAuth',{headers : new Headers({ 'Authorization':localStorage.getItem('secret_key')  })  
        }).map( res => res.json() );
    }

    checkClientAuth(){
       return this._http.get('https://devcentaurgw.kyriopyrina.com/api/index.php/main/checkAuth',{headers : new Headers({ 'Authorization':localStorage.getItem('secret_key')  })  
        }).map( res => res.json() );
    }
    
    sendLoginAdmin(value:any){
        
      const body = new URLSearchParams(value);
      body.set('username', value.data[0].username);
      body.set('password', value.data[0].password);
      let headers = new Headers();
      headers.append('Content-Type','application/x-www-form-urlencoded');
      return this._http.post(this._contactUrla, body, {
         headers : headers
      }).map( res => res.json() );

    }
  }