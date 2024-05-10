import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServiceService } from 'src/app/service/admin-service.service';
import { LoginService } from 'src/app/service/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {

  constructor(private adminService: AdminServiceService,
    private router: Router,
    private loginService: LoginService
  ) { }

  public logIn(formData: any) {

    this.adminService.adminLogin(formData.adminId, formData.password).subscribe({
      next: (res: any) => {
        this.loginService.setToken(res.token);
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        })
        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully'
        }).then(e => {
          this.router.navigate(['admin'])
        })
      },
      error: (err) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        })
        Toast.fire({
          icon: 'error',
          title: err.error.message
        })
      }
    })
  }
}
