import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { appendFile } from 'fs';
import * as moment from 'moment';
import { ApexNonAxisChartSeries, ApexChart, ApexResponsive, ChartComponent } from 'ng-apexcharts';
import { PieChart } from 'src/app/charts/pie-chart';
import { Announcement } from 'src/app/entity/announcement';
import { Assignment } from 'src/app/entity/assignment';
import { AssignmentSubmission } from 'src/app/entity/assignment-submission';
import { AttendanceLog } from 'src/app/entity/attendance-log';
import { FeesPay } from 'src/app/entity/fees-pay';
import { Leaves } from 'src/app/entity/leaves';
import { PaginationManager } from 'src/app/entity/pagination-manager';
import { StudentDetails } from 'src/app/entity/student-details';
import { StudentTaskSubmittion } from 'src/app/entity/student-task-submittion';
import { Task } from 'src/app/entity/task';
import { PageRequest } from 'src/app/payload/page-request';
import { AssignmentServiceService } from 'src/app/service/assignment.service';
import { FeesPayService } from 'src/app/service/fees-pay.service';
import { LeaveService } from 'src/app/service/leave.service';
import { LoginService } from 'src/app/service/login.service';
import { StudentService } from 'src/app/service/student.service';
import { TaskServiceService } from 'src/app/service/task-service.service';
import { UtilityServiceService } from 'src/app/service/utility-service.service';
import { WebsocketServiceDiscussionFormService } from 'src/app/service/websocket-service-discussion-form-service.service';
import { AppUtils } from 'src/app/utils/app-utils';
import Swal from 'sweetalert2';


export type ChartOptions = {
  series: any;
  chart: any;
  responsive: any;
  labels: any;
  legend: any;
  colors: any;
  stroke: any;
};

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions>;
  studentId: number = 0;
  student: StudentDetails = new StudentDetails();
  attendanceLog: AttendanceLog[] = [];
  leavesList: Leaves[] = [];
  leaveMonth = 'Month';
  feesPay: FeesPay[] = [];
  pieChart: PieChart = new PieChart();
  assignmentSubmissionsList: AssignmentSubmission[] = []
  assignmentSubmissionObj: AssignmentSubmission = new AssignmentSubmission
  taskSubmissionList: StudentTaskSubmittion[] = []
  taskSubmissionObj: StudentTaskSubmittion = new StudentTaskSubmittion
  unLockAssignments: any// Assignment[] = []
  lockAssignments: number[] = []
  assignmentId: number = 0;
  unLockAssignment: Assignment = new Assignment
  tasks: Task[] = []
  monthsList: string[] = [];
  attandancesState: string[] = [];

  // for attandance
  attandancePageManager: PaginationManager = new PaginationManager();
  attandancePageRequest: PageRequest = new PageRequest();
  // for task
  TaskpageManager: PaginationManager = new PaginationManager();
  TaskPageRequest: PageRequest = new PageRequest();
  //for assignment submission 
  assignmentSubmissionPageRequest: PageRequest = new PageRequest();
  assignmentSubmissionPagination: PaginationManager = new PaginationManager()

  // for task submission
  submissioTaskpageManager: PaginationManager = new PaginationManager();
  submissioTaskPageRequest: PageRequest = new PageRequest();

  status: any;
  taskIndexing: number = 0;


  constructor(private router: Router, private taskService: TaskServiceService, private assignmentService: AssignmentServiceService, private activateRoute: ActivatedRoute, private studentService: StudentService, private leaveService: LeaveService, private feesPayService: FeesPayService) {
    this.chartOptions = this.pieChart.chartOptions;
  }

  ngOnInit(): void {
    this.studentId = this.activateRoute.snapshot.params[('studentId')];
    this.getStudentProfileData();
    this.getSubmitedAssignment();
    this.getSubmitedTaskByStudent('');
    this.getAllAssignments();
    this.getAllTask();
    this.monthsList = AppUtils.months;
    this.attandancesState = AppUtils.attandancesState
  }

  public getStudentProfileData() {
    this.studentService.getStudentProfileData(this.studentId).subscribe({
      next: (data: any) => {
        this.student = data;
      }
    })
  }
  public updateStudent() {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.studentService.updateStudent(this.student).subscribe({
          next: (res: any) => {
            this.student = res
          }
        })
        Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        this.getStudentProfileData()
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  //-----------------start------------
  public attandanceManageNextPrev(isNext: boolean) {
    let i = 0;
    if (isNext) i = this.attandancePageRequest.pageNumber + 1;
    else i = this.attandancePageRequest.pageNumber - 1;
    if (i >= 0 && i < this.attandancePageManager.totalPages)
      this.attandancePageGet(i);
  }
  attandancePageGet(pageNumber: any) {
    if (pageNumber !== this.attandancePageRequest.pageNumber) {
      this.attandancePageRequest.pageNumber = pageNumber;
      this.getStudentOverAllAttendancesAndLeaves();
    }
  }

  public getStudentOverAllAttendancesAndLeaves() {
    if (this.attandancePageRequest.pageNumber == undefined)
      this.attandancePageRequest.pageNumber = 0;
    this.studentService.getStudentOverAllAttendancesAndLeave(this.studentId, this.attandancePageRequest).subscribe({
      next: (data: any) => {
        this.attendanceLog = data.content;
        this.attandancePageManager.setPageData(data)
        this.attandancePageRequest.pageNumber = data.pageable.pageManager;
      }
    })
  }

  public changeTimeFormat(time: any) {
    return moment(time, "HH:mm:ss").format("hh:mm:ss A");
  }

  public timerFormate(seconds: number) {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  }

  public getStudentLeaves() {
    this.leaveMonth = 'Month';
    this.leaveService.getStudentLeaves(this.studentId).subscribe({
      next: (res: any) => {
        this.leavesList = res.leavesData.response;
      }
    })
  }

  public getLeavesFilter(monthNo: number) {
    this.leaveMonth = moment(monthNo, "MM").format("MMMM");
    this.leaveService.getLeavesFiterData(this.studentId, monthNo).subscribe({
      next: (res: any) => {
        this.leavesList = res.leavesData.response;
      }
    })
  }

  public getAllTrasection() {
    this.feesPayService.getAllTransection(this.studentId).subscribe({
      next: (data: any) => {
        this.feesPay = data
      }
    })
  }


  public getSubmitedAssignment(status?: string) {
    this.status = status;
    // let element = document.getElementById('status2');
    // element!.innerText = status ? status : 'All'
    this.assignmentService.getSubmitedAssignmetByStudentId(this.studentId, this.assignmentSubmissionPageRequest, status ? status : '').subscribe({
      next: (data: any) => {
        this.assignmentSubmissionsList = data.content
        this.assignmentSubmissionPagination.setPageData(data)
        this.assignmentSubmissionPageRequest.pageNumber = data.pageable.pageNumber
      }
    })
  }

  public getSubmitedTaskByStudent(status: string) {
    this.status = status;
    // let element = document.getElementById('status1');
    /// element!.innerText = status ? status : 'ALL'
    this.taskService.getSubmitedTaskByStudent(this.studentId, this.submissioTaskPageRequest, status ? status : '').subscribe({
      next: (data: any) => {
        this.taskSubmissionList = data.content

        this.submissioTaskpageManager.setPageData(data)
        this.submissioTaskPageRequest.pageNumber = data.pageable.pageNumber
      }
    })
  }


  public getAllAssignments() {
    this.assignmentService.getAllLockedAndUnlockedAssignment(this.studentId).subscribe(
      (data: any) => {
        this.unLockAssignments = data.unLockedAssignment;
        this.lockAssignments = Array(data.lockedAssignment).fill(0).map((x, i) => i);
        this.unLockAssignments.forEach(() => {
          this.assignmentTaskVisibility.push(false);
        });
      }
    )
  }
  public getAssignment(id: number) {
    this.assignmentId = id;
    this.unLockAssignment = this.unLockAssignments.find((assignment: any) => assignment.id === id) as Assignment;
  }
  assignmentTaskVisibility: boolean[] = [];

  toggleAssignment(index: number): void {
    this.assignmentTaskVisibility[index] = !this.assignmentTaskVisibility[index];
  }
  public pageRenderUsingRouterLink(path: string, questionId: number) {
    const dataParams = {
      assignmentId: this.assignmentId,
      questionId: questionId,
    };
    this.router.navigate([path], {
      queryParams: dataParams
    });
  }
  progressWidth: string = '';
  calculatePercentages(num1: number, num2: number) {
    AppUtils.calculatePercentages(num1, num2)
  }

  public pageRenderUsingRouterLink1(path: string, questionId: number) {
    const dataParams = {
      id: questionId,
      type: "assignmentQuestion"
    };
    this.router.navigate([path], {
      queryParams: dataParams
    });
  }

  public getAllTask() {
    this.taskService.getAllTask(this.studentId, this.TaskPageRequest).subscribe(
      (data: any) => {
        this.tasks = data.allTask.content
        this.TaskpageManager.setPageData(data.allTask)
        this.taskIndexing = data.allTask.pageable.pageSize * data.allTask.pageable.pageNumber + 1
        this.TaskPageRequest.pageNumber = data.allTask.pageable.pageNumber
      }
    )
  }

  // this method is called from child component
  getAllData(event: any) {
    if (event.method == "getAllData") {
      if (event.type == "AssignmentSubmission") {
        this.getSubmitedAssignment()
      } else if (event.type == "task") {
        this.getAllTask()
      } else if (event.type == "") {
        this.getSubmitedTaskByStudent(this.status)
      }
    }
  }

}
