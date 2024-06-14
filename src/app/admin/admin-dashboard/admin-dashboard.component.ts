import { LocationStrategy } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StudentService } from 'src/app/service/student.service';
import { StudentDetails } from 'src/app/entity/student-details';
import { UtilityServiceService } from 'src/app/service/utility-service.service';
import { ChartComponent } from 'ng-apexcharts';
import { log } from 'console';
import { FeesService } from 'src/app/service/fees.service';
import { an } from '@fullcalendar/core/internal-common';
import { BarChart } from 'src/app/charts/bar-chart';
import { PieChart } from 'src/app/charts/pie-chart';
import { DonutChart } from 'src/app/charts/donut-chart';
import { FeesPayService } from 'src/app/service/fees-pay.service';
import { FeesPay } from 'src/app/entity/fees-pay';
import { Fees } from 'src/app/entity/fees';
import { SubmissionAssignmentTaskStatus } from 'src/app/entity/submission-assignment-task-status';
import { TaskServiceService } from 'src/app/service/task-service.service';
import { AssignmentServiceService } from 'src/app/service/assignment.service';

export type ChartOptions = {
  series: any;
  chart: any;
  dataLabels: any;
  plotOptions: any;
  xaxis: any;
  colors: any;
  yaxis: any;
  legend: any;
  responsive: any;
  labels: any;
  stroke: any;
};

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent | undefined;
  public admissinonOptions: Partial<ChartOptions>;
  public feesOptions: Partial<ChartOptions>;
  public feesPieOptions: Partial<ChartOptions>;
  public attendanceOptions: Partial<ChartOptions>;
  students: StudentDetails[] = []
  admissionData: [] = []
  years: number[] = [];
  admissionYear: number = 0;
  feesYear: number = 0;
  admissionMap = new Map<number, number>();
  feesMap = new Map<number, number>();

  admissionBar: BarChart = new BarChart();
  feesBar: BarChart = new BarChart();
  pieChart: PieChart = new PieChart();
  attendanceChart: DonutChart = new DonutChart();

  totaOnleaves = 0;
  totalAbsent = 0;
  totalPresent = 0;
  totalEarlyCheckOut = 0;

  feesPays: FeesPay[] = [];
  feeses: Fees[] = [];

  totalFees = 0;
  collectedFees = 0;
  pendingFees = 0

  totalSubmitted = 0;
  reveiwed = 0;
  unReveiwed = 0;

  taskSubmissionStatus2: SubmissionAssignmentTaskStatus = new SubmissionAssignmentTaskStatus

  constructor(private elementRef: ElementRef,
    private localst: LocationStrategy,
    private studentService: StudentService,
    private feesService: FeesService,
    private feesPayService: FeesPayService,
    private taskService: TaskServiceService,
    private assignmentService: AssignmentServiceService) {

    this.admissinonOptions = this.admissionBar.chartOptions

    this.feesOptions = this.feesBar.chartOptions
    this.feesOptions.series[0].name = 'Fees'

    this.feesPieOptions = this.pieChart.chartOptions
    this.feesPieOptions.labels = ['Total', 'Completed', 'Pending']
    this.feesPieOptions.colors = ['#49cf9f', '#4daaf8', '#f6c453']

    this.attendanceOptions = this.attendanceChart.chartOptions
    this.attendanceChart.chartOptions.colors = ['#49cf9f', '#f0845d', '#8079ff', "#88048f"]
    this.attendanceChart.chartOptions.labels = ["Present", "Absent", "Leaves", "EarlyCheckOut"]

    this.years = this.generateYearsArray(2000, new Date().getFullYear());
    this.admissionYear = new Date().getFullYear();
    this.feesYear = new Date().getFullYear();
  }


  ngOnInit(): void {
    this.preventBackButton();
    this.getNewRegistrationStudents();
    this.getAdmissinonDataByWiseForYear(this.admissionYear);
    this.getFeesCollectionMonthAndYearWise(this.feesYear);
    this.getAllFeesCollections();
    this.recentCollection(0, 6);
    this.upcomingDues(0, 6);
    this.getOverAllAssignmentTaskStatus();
    this.getTodayAttendanceForAdmin();
  }

  public preventBackButton() {
    history.pushState(null, '', location.href);
    this.localst.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }

  public getNewRegistrationStudents() {
    this.studentService.getAllStudent(0, 15).subscribe({
      next: (data: any) => {
        this.students = data.response;
      }
    })
  }

  public getAdmissinonDataByWiseForYear(year: number) {
    this.studentService.getAdmissinonDataByWiseForYear(year).subscribe({
      next: (data: any) => {
        this.admissionMap = data
        // this.getAdmissionBarChartData()
        this.admissinonOptions.series = [
          {
            name: "Student",
            data: data
          }
        ]
        this.admissinonOptions.xaxis = {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        }
      }
    })
  }



  // public getAdmissionBarChartData() {
  //   let arr: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  //   const mapEntries: [number, number][] = Object.entries(this.admissionMap).map(([key, value]) => [parseInt(key), value]);
  //   const resultMap: Map<number, number> = new Map<number, number>(mapEntries);
  //   for (const entry of resultMap.entries()) {
  //     arr[entry[0] - 1] = entry[1];
  //   }
  //   this.admissinonOptions.series[0].data = arr
  //  // window.dispatchEvent(new Event('resize'));
  // }
  public getFessBarData() {
    let arr: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const mapEntries: [number, number][] = Object.entries(this.feesMap).map(([key, value]) => [parseInt(key), value]);
    const resultMap: Map<number, number> = new Map<number, number>(mapEntries);
    for (const entry of resultMap.entries()) {
      arr[entry[0] - 1] = entry[1];
    }
    this.feesOptions.series[0].data = arr
    //  window.dispatchEvent(new Event('resize'));
  }

  public generateYearsArray(startYear: number, endYear: number): number[] {
    const years = [];
    for (let year = endYear; year >= startYear; year--) {
      years.push(year);
    }
    return years;
  }

  public getFeesCollectionMonthAndYearWise(year: number) {
    this.feesService.getFeesCollectionMonthAndYearWise(year).subscribe(
      (data: any) => {
        this.feesMap = data.body
        this.getFessBarData();
        this.feesOptions.xaxis = {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        }
      }
    )
  }

  public getChartData() {
    this.attendanceOptions.series = [this.totalPresent, this.totalAbsent, this.totaOnleaves]
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


  public getAllFeesCollections() {
    this.feesService.getAllFeesCollection().subscribe({
      next: (data: any) => {
        this.totalFees = data.body.Total
        this.collectedFees = data.body.Collected
        this.pendingFees = data.body.Pending

        this.feesPieOptions.series = [data.body.Total, data.body.Collected, data.body.Pending]
      }
    })
  }

  public recentCollection(page: Number, size: number) {
    this.feesPayService.feesPayList(page, size).subscribe(
      (data: any) => {
        this.feesPays = data.response;;
      }
    )
  }
  public upcomingDues(page: Number, size: number) {
    this.feesPayService.feesPendingList(page, size).subscribe(
      (data: any) => {
        this.feeses = data.response;;
      }
    )

  }

  public getOverAllAssignmentTaskStatus() {
    this.assignmentService.getOverAllAssignmentTaskStatus().subscribe(
      (data: any) => {
        this.totalSubmitted = data.totalCount
        this.reveiwed = data.reviewedCount
        this.unReveiwed = data.unreviewedCount
      }
    )
  }
}

