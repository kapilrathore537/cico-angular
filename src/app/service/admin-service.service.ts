import { UtilityServiceService } from './utility-service.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../entity/profile';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  BASE_URL=this.utilityService.getBaseUrl();
  adminUrl=this.BASE_URL+'/admin';
  profileData:Profile= new Profile;

  constructor(private http: HttpClient,private utilityService:UtilityServiceService,private loginService:LoginService) { }

  public adminLogin(adminId:string,password:string){
    return this.http.post(`${this.adminUrl}/adminLoginApi?adminId=${adminId}&password=${password}`,{
      responseType:'any'
    })
  }
  public getAdminProfileData() {
    if (this.profileData.adminId == '') {
      let id = this.loginService.getAdminId();
      this.http.get(`${this.adminUrl}/getAdmin?adminId=${id}`).subscribe(
        (data: any) => {
          this.profileData.name = data.adminName;
          this.profileData.profilePic = data.profilePic;
          this.profileData.adminId = data.adminEmail;
          this.profileData.role =this.loginService.getRole();
          console.log(this.profileData)
        }, (error) => {
          console.log(error);
        }
      )
      return this.profileData
    } else {
      if (this.profileData.adminId != this.loginService.getAdminId()) {
        this.profileData = new Profile();
        this.getAdminProfileData()
      }
      return this.profileData
    }
  }
}
