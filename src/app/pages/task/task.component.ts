import { StudentTaskSubmittion } from 'src/app/entity/student-task-submittion';
import { AfterViewInit, Component } from '@angular/core';
import { Task } from 'src/app/entity/task';
import { LoginService } from 'src/app/service/login.service';
import { TaskServiceService } from 'src/app/service/task-service.service';
import { DatePipe } from '@angular/common';
import { PaginationManager } from 'src/app/entity/pagination-manager';
import { PageRequest } from 'src/app/payload/page-request';
import { AppUtils } from 'src/app/utils/app-utils';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements AfterViewInit {
  
  tasks: Task[] = []
  taskSubmissionList: StudentTaskSubmittion[] = []
  taskSubmissionList2: StudentTaskSubmittion[] = []
  taskSubmissionObj: StudentTaskSubmittion = new StudentTaskSubmittion

  // for task submission
  submissioTaskpageManager: PaginationManager = new PaginationManager();
  submissioTaskPageRequest: PageRequest = new PageRequest();

  // for task
  TaskpageManager: PaginationManager = new PaginationManager();
  TaskPageRequest: PageRequest = new PageRequest();
  taskIndexing: number = 0

  status: any

  constructor(private taskService: TaskServiceService,
    private loginService: LoginService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.getAllTask();
    this.getSubmitedTaskByStudent('');
  }


  ngAfterViewInit(): void {
    let element = document.getElementById('status1');
    element!.innerText = 'All'
  }


  public getSubmitedTaskByStudent(status: string) {
    this.status = status?status:'';
    let element = document.getElementById('status1');
    element!.innerText = status ? status : 'ALL'
    this.taskService.getSubmitedTaskByStudent(this.loginService.getStudentId(), status?new PageRequest:this.submissioTaskPageRequest, status ? status : '').subscribe({
      next: (data: any) => {
        this.taskSubmissionList = data.content
        this.taskSubmissionList2 = data.content
        this.submissioTaskpageManager.setPageData(data)
        this.submissioTaskPageRequest.pageNumber = data.pageable.pageNumber
      }
    })
  }


  public getAllTask() {
    this.taskService.getAllTask(this.loginService.getStudentId(), this.TaskPageRequest).subscribe(
      (data: any) => {
        this.tasks = data.allTask.content
        this.TaskpageManager.setPageData(data.allTask)
        this.taskIndexing = data.allTask.pageable.pageSize * data.allTask.pageable.pageNumber + 1
        this.TaskPageRequest.pageNumber = data.allTask.pageable.pageNumber
      }
    )
  }

  todayDate: Date = new Date()
  public dateFormatter(date: Date) {
    return this.datePipe.transform(date, 'dd MMM yyyy');
  }

  getAllData(event: any) {
    if (event.method == "getAllData") {
      if (event.type == "task") {
        this.getAllTask()
      } else {
        this.getSubmitedTaskByStudent(this.status)
      }
    }
  }
}
