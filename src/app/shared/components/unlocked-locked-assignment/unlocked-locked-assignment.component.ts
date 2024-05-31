import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Assignment } from 'src/app/entity/assignment';
import { LoginService } from 'src/app/service/login.service';
import { AppUtils } from 'src/app/utils/app-utils';

@Component({
  selector: 'app-unlocked-locked-assignment',
  templateUrl: './unlocked-locked-assignment.component.html',
  styleUrls: ['./unlocked-locked-assignment.component.scss']
})
export class UnlockedLockedAssignmentComponent implements OnInit {
  ngOnInit(): void {

  }
  constructor(private router: Router, private loginService: LoginService) {
    this.role = loginService.getRole().toLowerCase();
    this.path = '/' + this.role + '/assignmentdetails';
  }
  assignmentId: number = 0;
  @Input() lockAssignments!: any
  @Input() unLockAssignments: any[] = []
  @Input() assignmentTaskVisibility: Boolean[] = []

  path: string = '';
  role: string = ''

  public pageRenderUsingRouterLink(questionId: number) {

    const dataParams = {
      assignmentId: this.assignmentId,
      questionId: questionId,
    };
    this.router.navigate([this.path], {
      queryParams: dataParams
    });
  }

  public calculatePercentages(num1: number, num2: number) {
    return AppUtils.calculatePercentages(num1, num2);
  }
  public getAssignment(id: number) {
    this.assignmentId = id;
    // this.unLockAssignments = this.unLockAssignments.find((assignment: any) => assignment.id == id);
  }

  toggleAssignment(index: number): void {
    this.assignmentTaskVisibility[index] = !this.assignmentTaskVisibility[index];
  }

}
