import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private router :  Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (localStorage.getItem('secret_key') != null){
    	return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}



