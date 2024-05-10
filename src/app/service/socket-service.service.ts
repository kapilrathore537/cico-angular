import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import * as SockJS from 'sockjs-client';
import { LoginService } from './login.service';
import { QRServiceService } from './qrservice.service';
import { UtilityServiceService } from './utility-service.service';
import * as Stomp from "stompjs";
import { StudentService } from './student.service';
import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {

  qrKey:any;
  stompClient: any = null;
  connection = false
  token:any
  BASE_URL = this.utilityService.getBaseUrl();
  SOCKET_URL = this.BASE_URL+'/socket';
  constructor(public qrService:QRServiceService,
    private loginService:LoginService,
    private router:Router,
    private utilityService:UtilityServiceService,
    private deviceService: DeviceDetectorService,
    private studentService:StudentService){}

  
    connect(){
      this.qrKey = localStorage.getItem('key');
      var socket = new SockJS(this.SOCKET_URL);
    this.stompClient = Stomp.over(socket);

    let that = this;
    this.stompClient.connect({}, function(frame:any){
      that.connection = true;
      
      that.stompClient.subscribe('/queue/messages-'+ that.qrKey,
      function(token:any){
        console.log("socket****"+token.body);
        if(token.body=='LOGOUT'){
         that.qrService.webLogout().subscribe({
          next:(data)=>{
            localStorage.clear();
            that.router.navigate(['']);
            that.stompClient.disconnect();
          }
        });
         return;
      }
        that.loginService.setToken(token.body);
        that.updateLoginStatus(token.body);
        that.router.navigate(['/student']);
      });
    });
  }
  
  public updateLoginStatus(token:string){
    const deviceInfo = this.deviceService.getDeviceInfo();
    this.qrService.updateLoginStatus(deviceInfo,token).subscribe({
      next:(data)=>{
        //console.log("update s"+data);
      }
    })
  }

    // mobileAuthentication(token:string){
    //   const deviceInfo = this.deviceService.getDeviceInfo();
    //   this.qrService.qrLogin(token,deviceInfo).subscribe(data => {
        
    //   });
    // }
  
    disconnect(){
      if(this.stompClient !=null){
        this.stompClient.disconnect();
      }
    }
  
}
