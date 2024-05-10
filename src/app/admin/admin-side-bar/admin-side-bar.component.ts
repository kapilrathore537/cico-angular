import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-side-bar',
  templateUrl: './admin-side-bar.component.html',
  styleUrls: ['./admin-side-bar.component.scss']
})
export class AdminSideBarComponent {

  check = '';
  constructor(private location: Location, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.getPath();
  }

  public getValueById(value: any) {
    this.check = value;
  }

  public getPath() {
    const path = this.location.path();
    if (path.toString().substring(7) == '') {
      this.check = 'dashboard'
    } else {
      this.check = path.toString().substring(7);
    }
  }

  public logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to logout!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#43b7e8',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, LogOut!'
    }).then((result) => {
      if (result.isConfirmed) {

        Swal.fire(
          'SUCCESS!',
          'Your are logged out.',
          'success'
        )
        this.loginService.logout()
        this.router.navigate(['login'])
      }
    })
  }
}
