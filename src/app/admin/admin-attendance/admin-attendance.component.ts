import { AbsentTodays } from './../../entity/absent-todays';
import { Component, HostListener, OnInit } from '@angular/core';
import { an } from '@fullcalendar/core/internal-common';
import { error, log } from 'console';
import { ActiveLeaves } from 'src/app/entity/active-leaves';
import { Leaves } from 'src/app/entity/leaves';
import { TodayLeavesRequest } from 'src/app/entity/today-leaves-request';

import { StudentService } from 'src/app/service/student.service';
import { UtilityServiceService } from 'src/app/service/utility-service.service';
import { ChartComponent } from "ng-apexcharts";
import { ViewChild } from "@angular/core";
import { PresentAndEarlyCheckout } from 'src/app/entity/present-and-early-checkout';
import * as moment from 'moment';
import { DonutChart } from 'src/app/charts/donut-chart';
import { PaginationManager } from 'src/app/entity/pagination-manager';
import { PageRequest } from 'src/app/payload/page-request';

export type ChartOptions = {
  series: any;
  chart: any;
  responsive: any;
  labels: any;
  colors: any
  legend: any;
  stroke: any;
};
@Component({
  selector: 'app-admin-attendance',
  templateUrl: './admin-attendance.component.html',
  styleUrls: ['./admin-attendance.component.scss']
})
export class AdminAttendanceComponent {

  absentData: AbsentTodays[] = []
  leavesData: ActiveLeaves[] = []
  leavesRequestData: TodayLeavesRequest[] = []

  leaveWidth = 0;
  absentWidth = 0;
  presentWidth = 0;

  attendanceFilter = 'Absent'
  presentAbsentAndEarlyCheckoutLength = 0;
  totalLeavesRequests = 0;
  currentMonth = ''

  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions>;

  totalAbsent: number = 0;
  totalPresent: number = 0;
  totaOnleaves: number = 0;
  totalEarlyCheckOut: number = 0;

  attendanceChart: DonutChart = new DonutChart();
  isDataFound: boolean = false


  // for absent
  absentPageManager: PaginationManager = new PaginationManager();
  absentPageRequest: PageRequest = new PageRequest();

  // for  leaves
  leavesPageManager: PaginationManager = new PaginationManager();
  leavesPageRequest: PageRequest = new PageRequest();

  // for leave request
  leavesRequestPageManager: PaginationManager = new PaginationManager();
  leavesRequestPageRequest: PageRequest = new PageRequest();



  constructor(private studentService: StudentService, private utilityService: UtilityServiceService) {
    this.chartOptions = this.attendanceChart.chartOptions
    this.attendanceChart.chartOptions.colors = ['#49cf9f', '#f0845d', '#8079ff', "#88048f"]
    this.attendanceChart.chartOptions.labels = ["Present", "Absent", "Leaves", "EarlyCheckOut"]
  }


  ngOnInit(): void {
    // this.loadStudents();
    this.getTotalStudentTodayLeavesRequest();
    this.getTodayAttendanceForAdmin();
    this.getAbsents();
    this.getActiveLeaves();
    this.currentMonth = moment(new Date().getMonth() + 1, "MM").format("MMMM");
    this.getMonthWiseAttendanceDataForChart(new Date().getMonth() + 1);
  }


  // absent pagination
  public getAbsents() {
    this.studentService.getTodayStudentAbsentData(this.absentPageRequest).subscribe(
      (data: any) => {
        this.absentData = data.content;
        this.absentPageManager.setPageData(data)
        this.absentPageRequest.pageNumber = data.pageable.pageManager;
      }
    )
  }

  public absentManageNextPrev(isNext: boolean) {
    let i = 0;
    if (isNext) i = this.absentPageRequest.pageNumber + 1;
    else i = this.absentPageRequest.pageNumber - 1;
    if (i >= 0 && i < this.absentPageManager.totalPages)
      this.absentPageGet(i);
  }
  absentPageGet(pageNumber: any) {
    if (pageNumber !== this.absentPageRequest.pageNumber) {
      this.absentPageRequest.pageNumber = pageNumber;
      this.getAbsents();
    }
  }



  // leaves pagination

  public leavesManageNextPrev(isNext: boolean) {
    let i = 0;
    if (isNext) i = this.leavesPageRequest.pageNumber + 1;
    else i = this.leavesPageRequest.pageNumber - 1;
    if (i >= 0 && i < this.leavesPageManager.totalPages)
      this.leavestPageGet(i);
  }
  leavestPageGet(pageNumber: any) {
    if (pageNumber !== this.leavesPageRequest.pageNumber) {
      this.leavesPageRequest.pageNumber = pageNumber;
      this.getActiveLeaves();
    }
  }

  public getActiveLeaves() {
    if (this.leavesPageRequest.pageNumber == undefined)
      this.leavesPageRequest.pageNumber = 0
    this.studentService.getStudentAtiveLeaves(this.leavesPageRequest).subscribe(
      (data: any) => {
        this.leavesData = data.content;
        this.leavesPageManager.setPageData(data)
        this.leavesPageRequest.pageNumber = data.pageable.pageManager;
        this.totaOnleaves = this.leavesData.length;
        this.getChartData();
      }
    )
  }

  /////////////////  leave request pagination

  public leavesRequestManageNextPrev(isNext: boolean) {
    let i = 0;
    if (isNext) i = this.leavesRequestPageRequest.pageNumber + 1;
    else i = this.leavesRequestPageRequest.pageNumber - 1;
    if (i >= 0 && i < this.leavesRequestPageManager.totalPages)
      this.leavestRequestPageGet(i);
  }
  leavestRequestPageGet(pageNumber: any) {
    if (pageNumber !== this.leavesRequestPageRequest.pageNumber) {
      this.leavesRequestPageRequest.pageNumber = pageNumber;
      this.getTotalStudentTodayLeavesRequest();
    }
  }
  public getTotalStudentTodayLeavesRequest() {
    if (this.leavesRequestPageRequest.pageNumber == undefined)
      this.leavesRequestPageRequest.pageNumber = 0
    this.studentService.getTodayLeavesRequest(this.leavesRequestPageRequest).subscribe(
      (data: any) => {
        this.leavesRequestData = data.content;
        this.totalLeavesRequests = this.leavesRequestData.length;
        this.leavesRequestPageManager.setPageData(data)
        this.leavesRequestPageRequest.pageNumber = data.pageable.pageManager;
      }
    )
  }

  public approveStudentLeaveReqeust(id: number, leaveId: number, status: string) {
    this.studentService.approveStudentLeaveReqeust(id, leaveId, status).subscribe(
      (data: any) => {
        this.getTotalStudentTodayLeavesRequest();
        this.getActiveLeaves();
      }, (error) => {
      }
    )
  }
  public getChartData() {
    this.chartOptions.series = [this.totalPresent, this.totalAbsent, this.totaOnleaves]
  }

  public manageStrackedBar(absent: number, present: number, leave: number) {
    let sum = present + absent + leave
    this.presentWidth = this.getPercentage(present, sum);
    this.absentWidth = this.getPercentage(absent, sum);
    this.leaveWidth = this.getPercentage(leave, sum);

  }

  public getPercentage(num: number, sum: number) {
    const percentage = (num / sum) * 100;
    const formattedPercentage = percentage.toFixed(2); // Limit to two decimal places
    return parseFloat(formattedPercentage);
  }

  public getTodayAttendanceFilter(value: string) {
    this.attendanceFilter = value
    if (value == 'Absent') {
      this.absentPageRequest = new PageRequest()
      this.getAbsents();
    }
    else {
      this.studentService.getTodayAttendanceFilter(value).subscribe({
        next: (data: any) => {
          this.absentData = data;
          this.presentAbsentAndEarlyCheckoutLength = this.absentData.length;
        }
      })
    }
  }

  public getMonthWiseAttendanceDataForChart(monthNum: number) {
    this.currentMonth = moment(monthNum, "MM").format("MMMM");
    this.studentService.getMonthWiseAttendanceData(monthNum).subscribe({
      next: (data: any) => {
        // this.leaveWidth = data.OnLeave
        // this.absentWidth = data.Absent
        // this.presentWidth = data.Present
        console.log(data);
        this.manageStrackedBar(data.Absent, data.Present, data.OnLeave);
      }
    })
  }

  public changeTimeFormat(time: any) {
    return moment(time, "HH:mm:ss").format("hh:mm A");
  }

  public getTodayAttendanceForAdmin() {
    this.studentService.getTodayAllAttendanceTypeForAdmin().subscribe({
      next: (data: any) => {
        this.totalPresent = data.present;
        this.totaOnleaves = data.leaves;
        this.totalAbsent = data.absent;
        this.totalEarlyCheckOut = data.earlyCheckOut;
        this.getChartData();
      }
    })
  }

}
