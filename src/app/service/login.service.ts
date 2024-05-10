import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { S } from '@fullcalendar/core/internal-common';
//import * as jwt_decode from "jwt-decode";
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  public setToken(token:any){
    localStorage.setItem('token',token);
  }

  public getToken(){
    let token = localStorage.getItem('token');
    return token;
  }

  public isLoggedIn(){
    let token = localStorage.getItem('token')
    if(token == undefined || token == '' || token == null)
      return false;
    else
      return true;
  }

  public getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  public getRole(){
    let token = this.getToken();
    if(token!=null){
      let tokenData = this.getDecodedAccessToken(token);
    if(tokenData!=null)
      return tokenData.Role;
    }
    return null;
  }

  public getStudentId(){
    let token = this.getToken();
    if(token!=null){
      let tokenData = this.getDecodedAccessToken(token);
    if(tokenData!=null)
      return tokenData.StudentId;
    }
    return null;
  }
  public getAdminId(){
    let token = this.getToken();
    if(token!=null){
      let tokenData = this.getDecodedAccessToken(token);
    if(tokenData!=null)
      return tokenData.adminId;
    }
    return null;
  }

  public isTokenExpired(): boolean {
    let token = this.getToken();
    if(token!=null){
    const decodedToken = this.getDecodedAccessToken(token);
    const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
    return expirationTime < Date.now();
    }
    return true;
  }

  public logout(){
    localStorage.clear();
  }

 
}


