import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Assignment } from 'src/app/entity/assignment';
import { AssignmentSubmission } from 'src/app/entity/assignment-submission';
import { PaginationManager } from 'src/app/entity/pagination-manager';
import { PageRequest } from 'src/app/payload/page-request';
import { AssignmentServiceService } from 'src/app/service/assignment.service';
import { LoginService } from 'src/app/service/login.service';
import { UtilityServiceService } from 'src/app/service/utility-service.service';

@Component({
  selector: 'app-taskandassignments',
  templateUrl: './taskandassignments.component.html',
  styleUrls: ['./taskandassignments.component.scss']
})
export class TaskandassignmentsComponent implements OnInit {

  unLockAssignments: any
  lockAssignments: any
  assignmentSubmissionsList: AssignmentSubmission[] = []
  assignmentSubmissionsList2: AssignmentSubmission[] = []
  unLockAssignment: Assignment = new Assignment
  assignmentSubmissionObj: AssignmentSubmission = new AssignmentSubmission
  assignmentId: number = 0;
  assignmentTaskVisibility: boolean[] = [false];
  assignmentCount: number = 0;
  todayDate: Date = new Date();
  status: any;

  //for assignment submission 
  assignmentSubmissionPageRequest: PageRequest = new PageRequest();
  assignmentSubmissionPagination: PaginationManager = new PaginationManager()

  assignmentPageRequest: PageRequest = new PageRequest();
  assignmentPagination: PaginationManager = new PaginationManager()

  constructor(
    private datePipe: DatePipe,
    private assignmentService: AssignmentServiceService,
    private router: Router,
    private loginService: LoginService) {
    this.lockAssignments = []
    this.unLockAssignments = 0

  }

  ngOnInit(): void {
    console.log(this.unLockAssignment!==undefined);
    
    this.getSubmitedAssignment();
    this.getAllAssignments();
  }


  public getSubmitedAssignment(status?: string) {
    this.status = status?status:'';
    let element = document.getElementById('status2');
    element!.innerText = status ? status : 'All'
    this.assignmentService.getSubmitedAssignmetByStudentId(this.loginService.getStudentId(),this.status?new PageRequest(): this.assignmentSubmissionPageRequest , status ? status : '').subscribe({
      next: (data: any) => {
        this.assignmentSubmissionsList = data.content
        this.assignmentSubmissionsList2 = data.content
        this.assignmentSubmissionPagination.setPageData(data)
        this.assignmentSubmissionPageRequest.pageNumber = data.pageable.pageNumber
      }
    })
  }

  //---------------  locked and unlocked -----

  public getAllAssignments() {
    this.assignmentService.getAllLockedAndUnlockedAssignment(this.loginService.getStudentId()).subscribe(
      (data: any) => {
        this.unLockAssignments = data.unLockedAssignment;
        this.assignmentCount = this.unLockAssignments.length
        this.lockAssignments = Array(data.lockedAssignment).fill(0).map((x, i) => i);
        this.unLockAssignments.forEach(() => {
          this.assignmentTaskVisibility.push(false);
        });
      }
    )
  }

  // this method is called from child component
  getAllData(event: any) {
    if (event.method == "getAllData") {
      if (event.type == "AssignmentSubmission") {
        this.getSubmitedAssignment()
      }
    }
  }
}
