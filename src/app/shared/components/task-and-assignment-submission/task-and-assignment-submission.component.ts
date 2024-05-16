import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationManager } from 'src/app/entity/pagination-manager';
import { StudentTaskSubmittion } from 'src/app/entity/student-task-submittion';
import { PageRequest } from 'src/app/payload/page-request';
import { AppUtils } from 'src/app/utils/app-utils';

@Component({
  selector: 'app-task-and-assignment-submission',
  templateUrl: './task-and-assignment-submission.component.html',
  styleUrls: ['./task-and-assignment-submission.component.scss'],
  providers: [AppUtils]
})
export class TaskAndAssignmentSubmissionComponent implements OnInit {

  taskSubmissionObj: StudentTaskSubmittion = new StudentTaskSubmittion
  todayDate: Date = new Date()
  @Input() submission: StudentTaskSubmittion[] = []

  @Input() id: any = "example1";
  @Input() title: any
  ngOnInit(): void {

  }
  constructor(private datePipe: DatePipe, private appUtil: AppUtils) {

  }

  public dateFormatter(date: Date) {
    return this.datePipe.transform(date, 'dd MMM yyyy');
  }
  downloadFile(fileName: string) {
    this.appUtil.downloadFile(fileName, 'task', true)
  }

  @Input() paginationManager !: PaginationManager
  @Input() pageRequest!: PageRequest
  @Input() data: any
  @Input() type !: string
  @Output() eventEmit = new EventEmitter<any>();

  getAllData(event: any) {
    this.eventEmit.emit({ 'method': 'getAllData', 'type': this.type })
  }
}
