import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'My Bills',  icon: 'fas fa-dollar-sign', class: 'tabs' },
    { path: '/services', title: 'My Services',  icon:'fas fa-align-justify', class: 'tabs' },
    { path: '/profile', title: 'My Profile',  icon:'far fa-user-circle', class: 'tabs' },
    // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    // { path: '/upgrade', title: 'Sign Out', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(
    public router: Router, 
    private toastr: ToastrService,) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  logout(){
        localStorage.removeItem('clientID');
        localStorage.removeItem('secret_key');
        this.router.navigate(['logout']);
  }
  
}
