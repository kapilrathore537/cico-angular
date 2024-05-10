import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
interface CustomToastConfig extends IndividualConfig {
  maxOpened?: number;
}
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toast: ToastrService) { }

  showSuccess(title: string, message: string, position?: string) {
    this.toast.success(message, title, {
      timeOut: 3000,
      positionClass: position ? position : 'toast-top-right',
      easeTime: 1000,
      maxOpened: 3,

    } as CustomToastConfig)
  }
  showError(title: string, message: string, position?: string) {
    this.toast.error(message, title, {
      timeOut: 3000,
      positionClass: position ? position : 'toast-top-right'
    })
  }

}
