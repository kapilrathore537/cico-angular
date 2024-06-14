import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AssignmentSubmission } from 'src/app/entity/assignment-submission';
import { Course } from 'src/app/entity/course';
import { Subject } from 'src/app/entity/subject';
import { SubmissionAssignmentTaskStatus } from 'src/app/entity/submission-assignment-task-status';
import { AssignmentRequest } from 'src/app/payload/assignment-request';
import { SubjectResponse } from 'src/app/payload/subject-response';
import { AssignmentServiceService } from 'src/app/service/assignment.service';
import { CourseServiceService } from 'src/app/service/course-service.service';
import { SubjectService } from 'src/app/service/subject.service';
import { UtilityServiceService } from 'src/app/service/utility-service.service';
import { ToastService } from 'src/app/service/toast.service';
import { PageRequest } from 'src/app/payload/page-request';
import { PaginationManager } from 'src/app/entity/pagination-manager';
import { AppUtils } from 'src/app/utils/app-utils';

@Component({
  selector: 'app-admin-assignments',
  templateUrl: './admin-assignments.component.html',
  styleUrls: ['./admin-assignments.component.scss']
})
export class AdminAssignmentsComponent implements OnInit, AfterViewInit {
  assignmentRequest: AssignmentRequest = new AssignmentRequest;
  courses: Course[] = [];
  subjectes: SubjectResponse[] = [];
  submitedAssignments: any[] = [];
  submitedAssignmentObj: AssignmentSubmission = new AssignmentSubmission
  taskSubmissionStatus: SubmissionAssignmentTaskStatus[] = []
  taskSubmissionStatus2: SubmissionAssignmentTaskStatus = new SubmissionAssignmentTaskStatus
  // message: string = ''
  course: Course = new Course

  totalSubmitted = 0;
  reveiwed = 0;
  unReveiwed = 0;
  courseId = 0;
  subjectId = 0;

  // for assignment 
  assignmentPageRequest: PageRequest = new PageRequest();
  assignmentPagination: PaginationManager = new PaginationManager()
  //for assignment submission 
  assignmentSubmissionPageRequest: PageRequest = new PageRequest();
  assignmentSubmissionPagination: PaginationManager = new PaginationManager()
  isSubmitAssignment: boolean = false;


  submissionForm: FormGroup
  constructor(private courseService: CourseServiceService,
    private subjectService: SubjectService,
    private assignmentService: AssignmentServiceService,
    private router: Router,
    private formBuilder: FormBuilder,
    private tost: ToastService) {

    this.submissionForm = this.formBuilder.group({
      subjectId: ['', Validators.required],
      courseId: ['', Validators.required],
      title: ['', Validators.required],
    });
  }


  ngOnInit(): void {

    this.getAllCourses();

    //this.getAllSubmissionAssignmentStatus()
    this.getOverAllAssignmentTaskStatus();
    this.courseFilterByCourseIdAndSubjectId(new Course, 0)
    // this.getAllSubject();
  }

  ngAfterViewInit(): void {
    this.allSubmissions();
  }


  public allSubmissions() {
    let el = document.getElementById('course2');
    el!.innerHTML = 'All'
    this.getAllSubmitedAssignments(new Course, 0, 'NOT_CHECKED_WITH_IT');
  }

  public getAllCourses() {
    this.courseService.getAllCourses(0, 100).subscribe({
      next: (data: any) => {
        this.courses = data.response;
      }
    })
  }
  public getAllSubject() {
    this.subjectService.getAllSubjects().subscribe({
      next: (data: any) => {
        this.subjectes = data;
      }
    })
  }

  public getSubject(id: number) {
    let subjects = this.courses.find(course => course.courseId == id)?.subjects;
    //  if (subjects != null)
    // this.subjects = subjects

  }

  public getCourseSubject(id: number) {
    this.subjectService.getAllSubjectsByCourseId(id).subscribe({
      next: (data: any) => {
        this.subjectes = []
        this.subjectes = data.subjects;
      },
      error: (er: any) => {

      }
    })
  }
  public createAssingment() {
    if (this.submissionForm.invalid) {
      this.submissionFormFun()
      return;
    } else {
      this.isSubmitAssignment = true

      this.assignmentService.createAssignment(this.assignmentRequest).subscribe({
        next: (data: any) => {
          this.tost.showSuccess('Successfully added', 'Success')
          this.router.navigate(['/admin/createassignments/' + data.assignmentId])
          this.isSubmitAssignment = false
        },
        error: (error) => {
          this.tost.showError(error.error.message, 'Error')
          this.isSubmitAssignment = false
        }
      }
      )
    }
  }

  public pageRanderWithObj(object: AssignmentSubmission, assignmentId: number) {
    const dataParams = {
      submissionId: object.submissionId,
      assignmentId: assignmentId
    };
    this.router.navigate(['/admin/assignmentsubmission'], {
      queryParams: dataParams
    });
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

  public courseFilter(event: any) {
    const selectedCourseId = event.target.value;
    if (selectedCourseId !== "") {
      this.courseService.getCourseByCourseId(selectedCourseId).subscribe(
        (data: any) => {
          this.assignmentRequest.courseId = data.courseId;
        }
      );
    } else {
      this.assignmentRequest.courseId = 0;

    }
  }
  getCourses() {
    this.courseFilterByCourseIdAndSubjectId(new Course, 0);
  }

  public courseFilterByCourseIdAndSubjectId(course: Course, subjectId: number, pageRequest?: PageRequest) {

    this.course = course;
    //getting the subjectes of course
    course.courseId !== 0 ? this.getCourseSubject(course.courseId) : this.subjectes = [];

    let c = document.getElementById('course1');
    let s = document.getElementById('subject1') as HTMLButtonElement;
    // disabled the subject button  if no subject are present
    course.courseId == 0 ? s.disabled = true : s!.disabled = false
    // managing the dropdown label  
    s!.innerText = this.subjectName != '' && subjectId != 0 ? this.subjectName : 'Subject'
    c!.innerText = course.courseName != '' ? course.courseName : 'Course'

    this.assignmentService.getAllSubmissionAssignmentTaskStatusByCourseIdFilter(course.courseId, subjectId, pageRequest ? pageRequest : new PageRequest()).subscribe((
      (data: any) => {
        this.taskSubmissionStatus = data.content
        this.assignmentPagination.setPageData(data);
        this.assignmentPageRequest.pageNumber = data.pageable.pageNumber;
      }
    ))
  }

  public getAllSubmitedAssignments(course: Course, subjectId: number, status: string, pageRequest?: PageRequest) {
    course.courseId !== 0 ? this.getCourseSubject(course.courseId) : this.subjectes = [];
    // managing the dropdown label
    this.course = course!;
    let c = document.getElementById('course2');
    let s = document.getElementById('subject2') as HTMLButtonElement;
    let st = document.getElementById('status2');

    // disabled the subject button  if no subject are present
    course.courseId == 0 ? s.disabled = true : s!.disabled = false
    s!.innerText = this.subjectName != '' && subjectId != 0 ? this.subjectName : 'Subject'
    c!.innerText = course.courseName != '' ? course.courseName : 'Course'
    st!.innerText = status != 'NOT_CHECKED_WITH_IT' ? status : 'Status'


    this.assignmentService.getAllSubmitedAssignments(this.course.courseId, subjectId, status, pageRequest ? pageRequest : new PageRequest()).subscribe({
      next: (data: any) => {
        this.submitedAssignments = data.content
        this.assignmentSubmissionPagination.setPageData(data)
        this.assignmentSubmissionPageRequest.pageNumber = data.pageable.pageNumber
      },
      error: (er: any) => {

      }
    })
  }

  subjectName: string = ''
  selectCourseSubject(subject: Subject) {
    this.subjectId = subject.subjectId
    this.subjectName = subject.subjectName
  }

  public clearFormSubmission() {
    this.submissionForm.reset()
  }

  public isFieldInvalidForSubmissionForm(fieldName: string): boolean {
    const field = this.submissionForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }
  public submissionFormFun() {
    AppUtils.submissionFormFun(this.submissionForm)
  }

  activateTask(obj: SubmissionAssignmentTaskStatus) {
    this.assignmentService.activateTask(obj.assignmentId).subscribe({
      next: (data: any) => {
        obj.status = data.status
        this.tost.showSuccess('Sucessfully updated!!', 'success')
      },
      error: (er: any) => {
        this.tost.showError(er.error.message, 'error')
      }
    })
  }

  isDuplicateAssignment(name: string, currentIndex: number): boolean {
    return this.taskSubmissionStatus.findIndex((assignment, index) => index < currentIndex && assignment.assignmentTitle === name) !== -1;
  }

  // this method is called from child component
  getAllData(event: any) {
    if (event.method == "getAllData") {
      if (event.type == "AssignmentSubmission") {
        this.getAllSubmitedAssignments(this.course, this.subjectId, 'NOT_CHECKED_WITH_IT', this.assignmentSubmissionPageRequest)
      } else if (event.type == "Assignment") {
        this.courseFilterByCourseIdAndSubjectId(this.course, this.subjectId, this.assignmentPageRequest);
      }
    }
  }
}

