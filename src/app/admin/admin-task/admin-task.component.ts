import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Course } from 'src/app/entity/course';
import { PaginationManager } from 'src/app/entity/pagination-manager';
import { StudentTaskSubmittion } from 'src/app/entity/student-task-submittion';
import { Subject } from 'src/app/entity/subject';
import { SubmissionAssignmentTaskStatus } from 'src/app/entity/submission-assignment-task-status';
import { PageRequest } from 'src/app/payload/page-request';
import { SubjectResponse } from 'src/app/payload/subject-response';
import { TaskRequest } from 'src/app/payload/task-request';
import { CourseServiceService } from 'src/app/service/course-service.service';
import { SubjectService } from 'src/app/service/subject.service';
import { TaskServiceService } from 'src/app/service/task-service.service';
import { ToastService } from 'src/app/service/toast.service';
import { AppUtils } from 'src/app/utils/app-utils';


@Component({
  selector: 'app-admin-task',
  templateUrl: './admin-task.component.html',
  styleUrls: ['./admin-task.component.scss']
})
export class AdminTaskComponent implements AfterViewInit {


  task: TaskRequest = new TaskRequest()
  subjects: Subject[] = []
  courses: Course[] = []
  submitedTasksList: StudentTaskSubmittion[] = []
  taskSubmissionStatus: SubmissionAssignmentTaskStatus[] = []
  taskSubmissionStatus2: SubmissionAssignmentTaskStatus = new SubmissionAssignmentTaskStatus
  totalSubmitted = 0;
  reveiwed = 0;
  unReveiwed = 0;
  courseId: number = 0


  firstTaskForm: FormGroup;
  message: string = ''
  subjectes: SubjectResponse[] = [];

  pageRequest: PageRequest = new PageRequest()
  pageManager: PaginationManager = new PaginationManager()

  submissioTaskpageManager: PaginationManager = new PaginationManager();
  submissioTaskPageRequest: PageRequest = new PageRequest();
  course = new Course()
  subject = new Subject
  isSubmitTask: boolean = false

  constructor(private subjectService: SubjectService,
    private courseService: CourseServiceService,
    private taskService: TaskServiceService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toast: ToastService) {

    this.firstTaskForm = this.formBuilder.group({
      taskName: ['', Validators.required],
      course: ['', Validators.required],
      subject: ['', Validators.required],
      taskAttachment: ['', Validators.required]
    })
  }
  ngAfterViewInit(): void {
    this.getCourses();
    this.getAllSubmittedTaskFilter(new Course, 0, 'NOT_CHECKED_WITH_IT', this.submissioTaskPageRequest)
    this.getOverAllAssignmentTaskStatus()
    this.courseFilterByCourseIdAndSubjectId(new Course, new Subject, this.pageRequest)
  }

  ngOnInit() {

  }

  getAllCourse() {
    this.courseFilterByCourseIdAndSubjectId(new Course, new Subject, this.pageRequest)
  }

  public isFieldInvalidForTaskForm(fieldName: string): boolean {
    const field = this.firstTaskForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  public getCourses() {
    this.courseService.getAllCourses(0, 100).subscribe(
      (data: any) => {
        this.courses = data.response
      }
    )
  }
  public getSubjects() {
    this.subjects = this.task.course.subjects
  }

  public submit() {
    if (this.firstTaskForm.invalid) {
      AppUtils.submissionFormFun(this.firstTaskForm);
      return;
    } else {
      this.isSubmitTask = true
      this.taskService.addTask(this.task).subscribe(
        {
          next: (data: any) => {
            this.toast.showSuccess(data.message, 'Success')
            this.firstTaskForm.reset()
            this.router.navigate(['/admin/createtask/' + data.taskId])
            this.isSubmitTask = false

          },
          error: (er: any) => {
            this.toast.showError(er.error.message, 'Error')
            this.isSubmitTask = false

          }
        }
      )
    }
  }

  subjectId!: number
  course1 = new Course
  subject1 = new Subject
  subjectName !: string

  getCourseSubjects(subject: Subject) {
    this.subjectId = subject.subjectId
    this.subjectName = subject.subjectName
  }


  resetSubmissionCourseFilter() {
    this.getAllSubmittedTaskFilter(new Course, 0, 'NOT_CHECKED_WITH_IT', this.submissioTaskPageRequest)
  }

  public getAllSubmittedTaskFilter(course: Course, subjectId: number, status: string, pageRequest: PageRequest) {
    this.course1 = course
    course.courseId != 0 ? this.getCourseSubject(course.courseId) : this.subjectes = []

    let c = document.getElementById('course2');
    let s = document.getElementById('subject2') as HTMLButtonElement;
    let st = document.getElementById('status2');

    course.courseId == 0 ? s.disabled = true : s!.disabled = false

    s!.innerText = subjectId != 0 ? this.subjectName : 'Subject'
    c!.innerText = course.courseName != '' ? course.courseName : 'Course'
    st!.innerText = status != 'NOT_CHECKED_WITH_IT' ? status : 'Status'

    this.taskService.getAllSubmitedTasks(course.courseId ? course.courseId : 0, subjectId ? subjectId : 0, status ? status : '', pageRequest).subscribe({
      next: (data: any) => {
        this.submitedTasksList = data.content
        this.submissioTaskpageManager.setPageData(data);
        this.submissioTaskPageRequest.pageNumber = data.pageable.pageNumber;
      }
    })
  }

  public getOverAllAssignmentTaskStatus() {
    this.taskService.getOverAllAssignmentTaskStatus().subscribe(
      (data: any) => {
        this.totalSubmitted = data.totalCount
        this.reveiwed = data.reviewedCount
        this.unReveiwed = data.unreviewedCount
      }
    )
  }


  calculatePercentages(num1: number, num2: number) {
    return num2 == 0 ? 0 : Math.floor((num1 / num2) * 100);
  }

  public getCourseSubject(id?: any) {
    this.subjectService.getAllSubjectsByCourseId(id ? id : this.task.course.courseId).subscribe({
      next: (data: any) => {
        this.subjectes = []
        this.subjectes = data.subjects;
      },
      error: (er: any) => {
        //  this.toast.showError(er.error.message, 'Error')
      }
    })
  }

  public courseFilterByCourseIdAndSubjectId(course: Course, subject: Subject, pageRequest: PageRequest) {
    this.course = course;
    course.courseId != 0 ? this.getCourseSubject(course.courseId) : this.subjectes = []
    let c = document.getElementById('course1');
    let s = document.getElementById('subject1') as HTMLButtonElement;
    course.courseId == 0 ? s.disabled = true : s!.disabled = false

    s!.innerText = subject.subjectName != '' && subject.subjectId != 0 ? subject.subjectName : 'Subject'
    c!.innerText = course.courseName != '' ? course.courseName : 'Course'
    this.taskService.getAllSubmissionTaskStatusByCourseIdAndSubjectIdFilter(course.courseId, subject.subjectId, pageRequest ? pageRequest : new PageRequest()).subscribe({
      next: (data: any) => {
        this.taskSubmissionStatus = data.data.content
        this.pageManager.setPageData(data.data);
        this.pageRequest.pageNumber = data.data.pageable.pageNumber;
      },
      error: (er: any) => {
        console.log(er.error.message);
      }
    })
  }


  public pageRanderWithObj(id: any, taskId: number) {
    const dataParams = {
      submissionId: id,
      taskId: taskId
    };

    this.router.navigate(['/admin/submission'], {
      queryParams: dataParams
    });
    //AppUtils.pageRendering('/admin/submission',dataParams)
  }

  ActivateTask(task: SubmissionAssignmentTaskStatus) {
    this.taskService.ActivateTask(task.taskId).subscribe({
      next: (data: any) => {
        task.status = data.status;
        this.toast.showSuccess('Sucessfully updated!!', 'success')
      },
      error: (er: any) => {
        this.toast.showError(er.error.message, 'error')
      }
    })
  }

  getAllData(event: any) {
    if (event.method == "getAllData") {
      if (event.type == "task") {
        this.courseFilterByCourseIdAndSubjectId(this.course, this.subject, this.pageRequest);
      } else if (event.type == "taskSubmission") {
        this.getAllSubmittedTaskFilter(this.course1, this.subject.subjectId, 'NOT_CHECKED_WITH_IT', this.submissioTaskPageRequest);
      }
    }
  }
}
