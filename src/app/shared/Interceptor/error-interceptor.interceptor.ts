// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
//   HttpErrorResponse,
//   HTTP_INTERCEPTORS
// } from '@angular/common/http';
// import { Observable, catchError, throwError } from 'rxjs';
// import { ToastService } from '../../service/toast.service';

// @Injectable()
// export class ErrorInterceptorInterceptor implements HttpInterceptor {

//   constructor(private tost: ToastService) { }

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {

//     return next.handle(request).pipe(
//       catchError((error: HttpErrorResponse) => {
//         let errorMessage = 'An error occurred';
//         if (error.status === 0) {
//           errorMessage = 'No Internet Connection';
//         } else if (error.status === 500) {
//           errorMessage = 'System Exception 500';
//         } else if (error.status >= 400 && error.status < 500) {
//           errorMessage = 'Client Error';
//         } else if (error.status >= 500) {
//           errorMessage = 'Server Down';
//         }

//         this.tost.showError(errorMessage, "Error");
//         return throwError(() => new Error(`${errorMessage}`));
//       })
//     );
//   }

// }

// export const errorInterceptorProvider = [
//   {
//     provide: HTTP_INTERCEPTORS,
//     useClass: ErrorInterceptorInterceptor,
//     multi: true,
//   }
// ]

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastService } from '../../service/toast.service';


export class ErrorInterceptorInterceptor  {

  
} 