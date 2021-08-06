import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title="app";
	constructor(
    public router: Router,) { }
  ngOnInit() {}
    logout(){
        localStorage.removeItem('clientID');
        localStorage.removeItem('secret_key');
        this.router.navigate(['logout']);
  }
}
