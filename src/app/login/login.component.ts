import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_model/user.model';
import { LoginService } from '../_service/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  loggedIn: string = "";
  isLogin: boolean = false;
  constructor(
  	public router: Router, 
    public _loginService: LoginService,
    private toastr: ToastrService,
    ) { }


  ngOnInit() {}

  login(){
      	let user = new User('','');
      	user.username = this.username;
      	user.password = this.password;
      	let data = [{'username':user.username,'password': user.password }
      	];
      	this._loginService.sendLogin({ data })
      	.subscribe(
      		response => this.handleResponse(response),
      		error => this.handleResponse(error)
      		);
  }



  handleResponse(response) { 
    
      	if(response.success){
          		console.log("success");
              // this.toastr.success('Welcome '+this.username+'.', 'Success!',);
              localStorage.setItem('clientID',response.clientID);
              localStorage.setItem('secret_key',response.secret_key);
              this.loggedIn = "loggedin";
              this.router.navigate(['/dashboard']);
      	} else if (response.error){
      		    this.username = "";
      		    this.password = "";
          	  this.isLogin = true;
              // this.toastr.error('Username or Password incorrect.', 'Error!');
      	} else {

      	}
    
  }


}
