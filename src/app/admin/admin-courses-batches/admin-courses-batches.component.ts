import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { log, error } from 'console';
import * as moment from 'moment';
import { Batch } from 'src/app/entity/batch';
import { Course } from 'src/app/entity/course';
import { TechnologyStack } from 'src/app/entity/technology-stack';
import { BatchRequest } from 'src/app/payload/batch-request';
import { BatchResponse } from 'src/app/payload/batch-response';
import { Coursereponse } from 'src/app/payload/coursereponse';
import { BatchesService } from 'src/app/service/batches.service';
import { CourseServiceService } from 'src/app/service/course-service.service';
import { TechnologyStackService } from 'src/app/service/technology-stack-service.service';
import { ToastService } from 'src/app/service/toast.service';
import { UtilityServiceService } from 'src/app/service/utility-service.service';
import { AppUtils } from 'src/app/utils/app-utils';

@Component({
  selector: 'app-admin-courses-batches',
  templateUrl: './admin-courses-batches.component.html',
  styleUrls: ['./admin-courses-batches.component.scss']
})
export class AdminCoursesBatchesComponent implements OnInit {

  courseId: number = 0
  batchId: number = 0;
  //course:Course = new Course();
  courseResponse: Coursereponse = new Coursereponse();
  // totalSubjects = 0
  // totalBatches = 0
  techImages: TechnologyStack[] = [];
  batchRequest: BatchRequest = new BatchRequest();
  batches: Batch[] = [];
  //batch:Batch = new Batch(); 
  batch: BatchResponse = new BatchResponse()
  imageName = '';
  createBatchFrom: FormGroup

  message = '';
  messageClass = ''
  isSubmitBatch:boolean=false
  isSubmitUpdateBatch:boolean=false


  constructor(private activateRoute: ActivatedRoute,
    private courseService: CourseServiceService,
    private batchService: BatchesService,
    private techService: TechnologyStackService,
    private utilityService: UtilityServiceService,
    private formBuilder: FormBuilder,
    private toast: ToastService) {
    this.createBatchFrom = this.formBuilder.group({
      selectedOption: ['', Validators.required],
      batchName: ['', Validators.required],
      batchStartDate: ['', Validators.required],
      batchTiming: ['', Validators.required],
      batchDetails: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.activateRoute.queryParams.forEach(param => {
      this.courseId = param['courseId']
    })
    this.getCourseByCourseId();
    this.getAllTechImages()
  }


  public getCourseByCourseId() {
    this.courseService.getCourseByCourseId(this.courseId).subscribe({
      next: (data: any) => {
        this.courseResponse = data;
        // this.totalSubjects = this.course.subjects.length
        // this.totalBatches = this.course.batches.length
      }
    })
  }

  isFieldInvalidForCreateBatchDetailsForm(fieldName: string): boolean {
    const field = this.createBatchFrom.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  public createBatchDetailsFormSubmition() {
    AppUtils.submissionFormFun(this.createBatchFrom)
  }

  public createNewBatch() {
    this.batchRequest.courseId = this.courseId;
    if (this.createBatchFrom.invalid) {
      AppUtils.submissionFormFun(this.createBatchFrom);
      return;
    }
    this.isSubmitBatch=true;
    this.batchService.createNewBatch(this.batchRequest).subscribe({
      next: (data: any) => {
        this.batchRequest = new BatchRequest()
        this.getCourseByCourseId();
        this.toast.showSuccess(data.message, 'Success')
        AppUtils.modelDismiss('add-batch-modal')
        this.isSubmitBatch=false
      },
      error: (err: any) => {
        this.isSubmitBatch=false
        this.toast.showError(err.error.message, 'Error')
      }
    })
  }

  public getAllTechImages() {
    this.techService.getAllTechnologyStack().subscribe({
      next: (data: any) => {
        this.techImages = data
      }
    });
  }

  public deleteBatch(id: number) {
    this.batchService.deletBatch(id).subscribe({
      next: (data: any) => {
        if (data.success) {
          this.toast.showSuccess('Successfully deletd', 'Error')
          this.getCourseByCourseId();
        }
      }
    })
  }

  public getBatchByBatchId(id: number) {
    this.batchService.getBatchById(id).subscribe({
      next: (data: any) => {
        this.batch = data
      }
    })
  }

  public updateBatch() {
    this.isSubmitUpdateBatch=true

    this.batchService.updateBatch(this.batch).subscribe({
      next: (data: any) => {
        this.batch = new BatchResponse();
        this.getCourseByCourseId();
        this.clearValidationForm();
        AppUtils.modelDismiss('edite-batch-modal')
        this.toast.showSuccess(data.message, 'Success')
        this.isSubmitUpdateBatch=false

      },
      error: (err: any) => {
        this.isSubmitUpdateBatch=false

        this.toast.showError(err.error.message, 'Error')
      }
    })
  }

  public changeTimeFormat(time: any) {
    return moment(time, "HH:mm:ss").format("hh:mm A");
  }

  public checkSubjectInCourse(id: number) {

    if (this.batch.subject.subjectId == id)
      return true
    return false;
  }

  public clearValidationForm() {
    this.createBatchFrom.reset();
  }

}
