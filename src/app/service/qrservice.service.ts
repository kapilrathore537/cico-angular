import { UtilityServiceService } from 'src/app/service/utility-service.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Profile } from '../entity/profile';
import { profile } from 'console';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class QRServiceService {

  BASE_URL = this.utilityService.getBaseUrl();
  qrUrl = this.BASE_URL + "/qr"

  profileData: Profile = new Profile();

  constructor(private utilityService: UtilityServiceService, private http: HttpClient,private route:Router) { }

  
  
  
  public generateQRCode() {
    return this.http.get(`${this.qrUrl}/qrGenerator`);
  }

  // // public qrLogin(token: string,deviceInfo:any): Observable<any> {
  // //   console.log(token);
    

  //    var params:HttpParams = new HttpParams;
  //    params=params.append('token',token);
  //    params = params.append('os',deviceInfo.os)
  //    params=params.append('deviceType',deviceInfo.deviceType)
  //    params=params.append('browser',deviceInfo.browser)
  //   return this.http.post<any>(this.qrUrl + "/clientlogin",{params},
  //     { headers: { "Content-Type": "application/json; charset=UTF-8" } })
  //     .pipe(map(response => {
  //       if (response) {
  //         localStorage.setItem('token', response.token);
  //         this.profileData.name = response.name;
  //         this.profileData.profilePic = response.profilePic;
  //         this.profileData.studentId = response.id;
  //         this.profileData.course = response.course;
  //       }
  //       return response;
  //     }));
  // }

  //    var params:HttpParams = new HttpParams;
  //    params=params.append('token',token);
  //    params = params.append('os',deviceInfo.os)
  //    params=params.append('deviceType',deviceInfo.deviceType)
  //    params=params.append('browser',deviceInfo.browser)
  //   return this.http.post<any>(this.qrUrl + "/clientlogin",{params},
  //     { headers: { "Content-Type": "application/json; charset=UTF-8" } })
  //     .pipe(map(response => {
  //       if (response) {
  //         localStorage.setItem('token', response.token);
  //         this.profileData.name = response.name;
  //         this.profileData.profilePic = response.profilePic;
  //         this.profileData.id = response.id;
  //         this.profileData.course = response.course;
  //       }
  //       return response;
  //     }));
  // }
  public getProfileData() {
    return this.profileData;
  }

  public updateLoginStatus(deviceInfo:any,token:string){
    return this.http.post(`${this.qrUrl}/updateWebLoginStatus?token=${token}&os=${deviceInfo.os}&deviceType=${deviceInfo.deviceType}&browser=${deviceInfo.browser}`,
    {responseType:'any'})
  }

  public webLogout(){
    return this.http.delete(`${this.qrUrl}/webLogout`);
  }

  public isWebLoggedIn(){
    let key = localStorage.getItem('key');
    return this.http.get(`${this.qrUrl}/getLinkedDeviceByUuid?key=${key}`);
  }

}