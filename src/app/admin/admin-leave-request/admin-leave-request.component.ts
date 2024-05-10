import { Component, OnInit } from '@angular/core';
import { PaginationManager } from 'src/app/entity/pagination-manager';
import { TodayLeavesRequest } from 'src/app/entity/today-leaves-request';
import { PageRequest } from 'src/app/payload/page-request';
import { StudentService } from 'src/app/service/student.service';


@Component({
  selector: 'app-admin-leave-request',
  templateUrl: './admin-leave-request.component.html',
  styleUrls: ['./admin-leave-request.component.scss']
})
export class AdminLeaveRequestComponent implements OnInit {

  leavesRequestData: TodayLeavesRequest[] = []
  length = 0;

   // for leave request
   leavesRequestPageManager: PaginationManager = new PaginationManager();
   leavesRequestPageRequest: PageRequest = new PageRequest();
 
  constructor(private studentService: StudentService) { }


  ngOnInit(): void {
    this.getTotalStudentTodayLeavesRequest();
  }

  // public getTotalStudentTodayLeavesRequest() {
  //   // this.studentService.getTodayLeavesRequest().subscribe(
  //   //   (data: any) => {
  //   //     this.leavesRequestData = data;
  //   //     this.length = this.leavesRequestData.length
  //   //   }
  //   // )
 // }

  public approveStudentLeaveReqeust(id: number, leaveId: number, status: string) {
    this.studentService.approveStudentLeaveReqeust(id, leaveId, status).subscribe(
      (data: any) => {
        this.getTotalStudentTodayLeavesRequest();
      }, (error) => {
      }
    )
  }


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
    this.studentService.getTodayLeavesRequest(this.leavesRequestPageRequest).subscribe(
      (data: any) => {
        this.leavesRequestData = data.content;
        this.length = this.leavesRequestData.length;
        this.leavesRequestPageManager.setPageData(data)
        this.leavesRequestPageRequest.pageNumber = data.pageable.pageManager;
      }
    )
  }

}
