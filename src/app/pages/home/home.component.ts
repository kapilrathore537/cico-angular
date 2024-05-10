import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { QRServiceService } from 'src/app/service/qrservice.service';
import { SocketServiceService } from 'src/app/service/socket-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private socketService:SocketServiceService,private qrService:QRServiceService,private router:Router,private loginService:LoginService){}
  ngOnInit(): void {
    this.socketService.connect();
    this.qrService.isWebLoggedIn().subscribe({
      next:(data:any)=>{
        if(data.loginDevice == null){
          this.loginService.logout();  
          this.router.navigate(['']);
        }
      }
    })
  }

  
  
}