import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { JobAlert } from 'src/app/entity/job-alert';
import { JobAlertService } from 'src/app/service/job-alert.service';
import { MatPaginator } from '@angular/material/paginator';
import { UtilityServiceService } from 'src/app/service/utility-service.service';
@Component({
  selector: 'app-jobalert',
  templateUrl: './jobalert.component.html',
  styleUrls: ['./jobalert.component.scss']
})
export class JobalertComponent {

  internshipJobs: JobAlert[] = []
  jobs: JobAlert[] = []
  totalInternJobs: number = 0
  totalJobs: number = 0

  jobId: number = 0
  showFullMessage = false;
  numberOfJob = 0;

  constructor(private jobAlertService: JobAlertService) { }
  ngOnInit() {
    this.getAllJobs(0, 8);
    this.getAllInternJobs(0, 8);
  }

  public getAllInternJobs(page: number, size: number) {
    this.jobAlertService.getInternShipJobs(page, size).subscribe(
      (data: any) => {
        this.internshipJobs = data.response
      }
    )
  }

  public getAllJobs(page: Number, size: number) {
    this.jobAlertService.getAllJobs(page, size).subscribe(
      (data: any) => {
        this.jobs = data.response
        this.totalJobs = data.totalElements
      }
    )
  }

  public pageChange2(event: any) {
    this.getAllJobs(event.pageIndex, event.pageSize);
  }

  public pageChange1(event: any) {
    this.getAllInternJobs(event.pageIndex, event.pageSize);
  }

  toggleShowMore(num: number, jobId: number) {
    this.jobId = jobId
    this.numberOfJob = num;
    this.showFullMessage = !this.showFullMessage;
  }


}
