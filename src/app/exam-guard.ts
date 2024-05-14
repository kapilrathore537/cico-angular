// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { ExamService } from './exam.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class ExamGuard implements CanActivate {
//   constructor(private examService: ExamService, private router: Router) {}

//   canActivate(): boolean {
//     if (this.examService.isExamCompleted()) {
//       // If exam is completed, redirect to results page or home page
//       this.router.navigate(['/results']);  // assuming '/results' is your results route
//       return false;
//     }
//     return true;
//   }
// }
