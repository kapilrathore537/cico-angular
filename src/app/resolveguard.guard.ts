import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, observable } from 'rxjs';
import { LoginService } from './service/login.service';


@Injectable({
  providedIn: 'root'
})
export class resolveguard implements Resolve<any> {

  constructor(private loginService: LoginService, private router: Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> {
    return new Observable<''>;
  }



}
