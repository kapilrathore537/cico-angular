import { BatchesService } from 'src/app/service/batches.service';
import { Course } from './../../entity/course';
import { Component, Input, OnInit } from '@angular/core';
import { CourseServiceService } from 'src/app/service/course-service.service';
import { JavaScriptLoaderService } from 'src/app/service/java-script-loader.service';
import { UtilityServiceService } from 'src/app/service/utility-service.service';
import { Batch } from 'src/app/entity/batch';
import { FeesPayService } from 'src/app/service/fees-pay.service';
import { FeesPay } from 'src/app/entity/fees-pay';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-mycourse',
  templateUrl: './mycourse.component.html',
  styleUrls: ['./mycourse.component.scss']
})
export class MycourseComponent implements OnInit {

  courses: Course[] = [];
  batches: Batch[] = []
  length: number = 0;
  feesPay: FeesPay[] = [];
  feesPayLength: number = 0;
  coruseProgress: number = 0;
  progress: number = 0;

  startDate: any;
  endDate: any;
  courseName: any;
  courseImg = '';

  constructor(private couserService: CourseServiceService, private batchService: BatchesService, private feesPayService: FeesPayService, private activateRoute: ActivatedRoute, private loginService: LoginService) { }

  ngOnInit(): void {

    this.getAllCourses();
    this.getAllUpcomingBatches();
    this.getAllTrasection();
    this.getCourseProgress()
  }

  public getAllCourses() {
    this.couserService.getAllCourseForStudent(this.loginService.getStudentId()).subscribe({
      next: (data: any) => {
        this.courses = data.courses;
      }
    })
  }
  public getAllUpcomingBatches() {
    this.batchService.getUpcomingBatch().subscribe({
      next: (data: any) => {
        this.batches = data
        this.length = this.batches.length

      }
    })
  }
  public getAllTrasection() {
    this.feesPayService.getAllTransection(this.loginService.getStudentId()).subscribe({
      next: (data: any) => {
        this.feesPay = data
        this.feesPayLength = this.feesPay.length
      }
    })
  }

  public getCourseProgress() {

    this.couserService.getCourseProgress(this.loginService.getStudentId()).subscribe({
      next: (data: any) => {
        this.progress = Math.floor(data.percentage)
        this.startDate = data.joinDate;
        this.endDate = data.endDate;
        this.courseName = data.courseName;
        this.courseImg = data.image;
      }
    })
  }

}
