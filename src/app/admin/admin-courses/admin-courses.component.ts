import { CourseServiceService } from 'src/app/service/course-service.service';
import { CourseRequest } from './../../payload/course-request';
import { Component, OnInit } from '@angular/core';
import { TechnologyStack } from 'src/app/entity/technology-stack';
import { TechnologyStackService } from 'src/app/service/technology-stack-service.service';
import { Course } from 'src/app/entity/course';
import { SubjectService } from 'src/app/service/subject.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityServiceService } from 'src/app/service/utility-service.service';
import { Subject } from 'src/app/entity/subject';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Coursereponse } from 'src/app/payload/coursereponse';
import { isThisISOWeek } from 'date-fns';
import { SubjectResponse } from 'src/app/payload/subject-response';
import { AppUtils } from 'src/app/utils/app-utils';
import { ToastrService } from 'ngx-toastr';
import { ToastService } from 'src/app/service/toast.service';
import { log } from 'console';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.scss']
})
export class AdminCoursesComponent implements OnInit {

  subjects: SubjectResponse[] = [];
  courseRequest: CourseRequest = new CourseRequest();
  courseUpdate: CourseRequest = new CourseRequest();
  selectedSubjectIds: number[] = [];
  techImages: TechnologyStack[] = [];
  courseIndex!: number

  courseResponse: Coursereponse[] = []
  courseResponse1 = new Coursereponse()

  messageClass = '';
  totalBatches = 0;
  totalSubjects = 0;
  totalCourses = 0;
  course: Course = new Course();
  courseId: number = 0
  imageName: string | undefined;
  loading: boolean = false;
  loadingUpdate: boolean = false;


  courseresponseobj: Coursereponse = new Coursereponse()

  addCourseForm: FormGroup;

  constructor(private courseService: CourseServiceService,
    private techService: TechnologyStackService,
    private subjectService: SubjectService,
    private utilityService: UtilityServiceService,
    private formBuilder: FormBuilder,
    private toast: ToastService) {
    this.addCourseForm = this.formBuilder.group({
      courseName: ['', Validators.required],
      courseFees: ['', Validators.required],
      duration: ['', Validators.required],
      subjectIds: ['', Validators.required],
      sortDescription: ['', Validators.required],
      isStarterCourse: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllCourses();
    this.getAllTechImages();
    this.getAllSubjects();

  }

  // checkboxChanged(subjectId: number) {
  //   const index = this.courseRequest.subjectIds.indexOf(subjectId);
  //   if (index === -1) {
  //     this.courseRequest.subjectIds.push(subjectId);
  //   } else {
  //     this.courseRequest.subjectIds.splice(index, 1);
  //   }
  // }

  checkboxChanged(event: any, subjectId: number) {
    if (event.target.checked) {
      this.selectedSubjectIds.push(subjectId);
    } else {
      this.selectedSubjectIds = this.selectedSubjectIds.filter(id => id !== subjectId);
    }
  }

  isFieldInvalidForAddCourseDetailsForm(fieldName: string): boolean {
    const field = this.addCourseForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  public courseDetailsFormSubmition() {
    AppUtils.submissionFormFun(this.addCourseForm)
  }

  public saveCourse() {

    if (this.addCourseForm.invalid && this.imageName == '') {
      this.addCourseForm.markAllAsTouched();
      return;
    } else {
      this.loading = true
      this.courseRequest.subjectIds = this.selectedSubjectIds
      this.courseService.saveCourse(this.courseRequest).subscribe({
        next: (data: any) => {
          this.loading = false
          this.getAllCourses();
          this.selectedSubjectIds = []
          this.toast.showSuccess(data.message, 'Success')
          AppUtils.modelDismiss('course-form-close')
          this.loading=false
        },
        error: (err: any) => {
          this.loading = false
          this.toast.showError(err.error.message, 'Error')
          this.loading=false

        }
      })
    }
  }

  public getAllCourses() {
    this.courseService.getAllCourses(0, 10).subscribe({
      next: (data: any) => {
        this.courseResponse = data.response;
        this.totalCourses = this.courseResponse.length
      }
    });
  }

  public getAllTechImages() {
    this.techService.getAllTechnologyStack().subscribe({
      next: (data: any) => {
        this.techImages = data
      }
    });
  }

  public getAllSubjects() {
    this.subjectService.getAllSubjects().subscribe({
      next: (data: any) => {
        this.subjects = data;
      }
    });
  }

  public getCourseById(id: number) {
    this.courseService.getCourseByCourseId(id).subscribe({
      next: (data: any) => {
        this.courseResponse1 = data
      }
    })

  }

  public updateCourse() {

    this.courseUpdate.courseId = this.courseResponse1.courseId
    this.courseUpdate.courseFees = this.courseResponse1.courseFees
    this.courseUpdate.courseName = this.courseResponse1.courseName
    this.courseUpdate.duration = this.courseResponse1.duration
    this.courseUpdate.sortDescription = this.courseResponse1.sortDescription
    this.courseUpdate.isStarterCourse = this.courseResponse1.isStarterCourse
    this.courseUpdate.technologyStack = this.courseResponse1.technologyStack.id
    this.courseUpdate.subjectIds = []
    this.courseUpdate.subjectIds = this.courseResponse1.subjectResponse.map(obj => obj.subjectId) as number[]
    this.loadingUpdate = true

    this.courseService.updatCourse(this.courseUpdate).subscribe({

      next: (data: any) => {
        this.courseRequest = new CourseRequest();
        this.getAllCourses();
        this.toast.showSuccess(data.message, 'Success')
        AppUtils.modelDismiss('course-update-modal')
        this.loadingUpdate = false
      },
      error: (err: any) => {
        this.toast.showError(err.error.message, 'Error')
        this.loadingUpdate = false


      }
    })
  }

  public deleteCourse() {
    this.courseService.deleteCourse(this.courseId).subscribe({
      next: (data: any) => {
        this.courseResponse.splice(this.courseIndex, 1)
        this.toast.showSuccess('Successfully deleted', 'Success')
      },
      error: (er: any) => {
        this.toast.showError('error', 'Error')
      }
    })
  }

  public checkSubjectInCourse(id: number) {
    if (this.courseResponse1.subjectResponse.find(e => e.subjectId == id))
      return true
    return false;
  }


  public addAndRemoveSubjectsFromCourse(subject: any) {
    let index = this.courseResponse1.subjectResponse.findIndex(e => e.subjectId == subject.subjectId);
    if (index === -1) {
      this.courseResponse1.subjectResponse.push(subject);
    } else {
      this.courseResponse1.subjectResponse.splice(index, 1);
    }
  }

  public clearValidationForm() {
    this.imageName = '';
    this.addCourseForm.reset();
    this.courseRequest = new CourseRequest();
  }


  openModal() {
    const modal = document.getElementById('course-add-modal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }

  // Function to close the modal
  closeModal() {
    const modal = document.getElementById('course-add-modal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }
  trackById(item: any) {
    return item.courseId;
  }

  onClick(event: any) {
    if (event.type == "getData") {
      this.getCourseById(event.id)
    } else if (event.type == "delete") {
      this.courseId = event.id;
      this.courseIndex = event.index;
    }
  }

}
