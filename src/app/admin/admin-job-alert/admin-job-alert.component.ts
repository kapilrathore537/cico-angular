import { preserveWhitespacesDefault } from '@angular/compiler';
import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobAlert } from 'src/app/entity/job-alert';
import { TechnologyStack } from 'src/app/entity/technology-stack';
import { JobalertComponent } from 'src/app/pages/jobalert/jobalert.component';
import { JobAlertRequest } from 'src/app/payload/job-alert-request';
import { JobAlertService } from 'src/app/service/job-alert.service';
import { TechnologyStackService } from 'src/app/service/technology-stack-service.service';
import { UtilityServiceService } from 'src/app/service/utility-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin-job-alert',
  templateUrl: './admin-job-alert.component.html',
  styleUrls: ['./admin-job-alert.component.scss'],
  preserveWhitespaces: true
})
export class AdminJobAlertComponent implements OnInit,AfterViewInit {

  jobs: JobAlert[] = [];
  jobData: JobAlertRequest = new JobAlertRequest();
  internshipJobs: JobAlert[] = []
  totalInternJobs: number = 0
  totalJobs: number = 0
  technologyStack: TechnologyStack[] = []
  pageNumber: number = 0
  pageSize = 10;
  totaljobAlert = 0;
  length: number = 0
  joblength: number = 0
  jobId: number = 0

  showFullMessage = false;
  numberOfJob = 0;


  constructor(private jobAlertService: JobAlertService, private technologyStackService: TechnologyStackService) { }
  

  ngOnInit() {

  }
  ngAfterViewInit() {
    this.getAllJobs(0, 8);
    this.getAllInternJobs(0, 8);
  }

  public getAllInternJobs(page: number, size: number) {
    this.jobAlertService.getInternShipJobs(page, size).subscribe(
      (data: any) => {
        this.internshipJobs = data.response
        this.length = this.internshipJobs.length
      }
    )
  }

  public getAllJobs(page: Number, size: number) {
    this.jobAlertService.getAllJobs(page, size).subscribe(
      (data: any) => {
        this.jobs = data.response
        this.totalJobs = data.totalElements
        this.joblength = this.jobs.length
      }
    )
  }
  public pageChange2(event: any) {
    this.getAllJobs(event.pageIndex, event.pageSize);
  }

  public pageChange1(event: any) {
    this.getAllInternJobs(event.pageIndex, event.pageSize);
  }

  public activeJob(id: number) {
    this.jobAlertService.activeJob(id).subscribe(
      (data) => {
      }
    )
  }
  submit() {
    this.jobAlertService.addJob(this.jobData).subscribe(
      (data) => {
        this.ngOnInit()
      }
    )
  }
  getTechnologyStack() {
    this.technologyStackService.getAllTechnologyStack().subscribe(
      (data: any) => {
        this.technologyStack = data
      }
    )
  }


  getJobAlertById(jobId: number) {
    this.jobAlertService.getJob(jobId).subscribe(
      (data: any) => {
        this.jobData = data
      }
    )
  }

  deleteJob(jobId: number) {
    this.jobAlertService.delete(jobId).subscribe(
      (data: any) => {
        this.getAllJobs(0, 8);
        this.getAllInternJobs(0, 8);

      }
    )
  }

  toggleShowMore(num: number, jobId: number) {
    this.jobId = jobId
    this.numberOfJob = num;
    this.showFullMessage = !this.showFullMessage;
    console.log(this.jobs[0].jobDescription.length);
    
  }

}
