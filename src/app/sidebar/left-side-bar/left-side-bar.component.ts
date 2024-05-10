import { QRServiceService } from 'src/app/service/qrservice.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.scss']
})
export class LeftSideBarComponent implements OnInit {

  check='';
  constructor (private qrService:QRServiceService,private location:Location,private loginService:LoginService,private router:Router) {}

  ngOnInit(){
    this.getPath() ;
  }

  public getValueById(value:any){
    this.check = value;
  }

  public getPath() {
    const path = this.location.path();

    if(path.toString().substring(9)== ''){
      this.check = 'dashboard'
    }else{
      this.check = path.toString().substring(9);
    }
  }

  public logout(){
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to logout!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, LogOut!'
    }).then((result) => {
      if (result.isConfirmed) {
        
        Swal.fire(
          'SUCCESS!',
          'Your are logged out.',
          'success'
        )
        this.qrService.webLogout().subscribe({
          next:(data)=>{
            localStorage.clear();
            this.router.navigate(['']);
          }
        });;
      }
    })
    }
}
