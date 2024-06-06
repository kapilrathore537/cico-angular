import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Chapter } from 'src/app/entity/chapter';
import { Subject } from 'src/app/entity/subject';
import { TechnologyStack } from 'src/app/entity/technology-stack';
import { SubjectResponse } from 'src/app/payload/subject-response';
import { SubjectService } from 'src/app/service/subject.service';
import { TechnologyStackService } from 'src/app/service/technology-stack-service.service';
import { ToastService } from 'src/app/service/toast.service';
import { UtilityServiceService } from 'src/app/service/utility-service.service';
import { AppUtils } from 'src/app/utils/app-utils';

@Component({
  selector: 'app-admin-subjects',
  templateUrl: './admin-subjects.component.html',
  styleUrls: ['./admin-subjects.component.scss']
})
export class AdminSubjectsComponent implements OnInit {
  BASE_URL = this.utilityService.getBaseUrl();
  techImages: TechnologyStack[] = [];
  chapter: Chapter[] = []
  subjects: SubjectResponse[] = [];
  subjectData = {
    imageId: 0,
    subjectName: ''
  };
  message: string = ''
  subject: SubjectResponse = new SubjectResponse
  subjectId: number = 0;
  imageName = ''
  subjectSubmissionForm: FormGroup;
  subjectIndex = 0;
  isSubmited: boolean = false
  isSubmittedEdit:boolean=false

  constructor(private techService: TechnologyStackService,
    private subjectService: SubjectService,
    private utilityService: UtilityServiceService
    , private formBuilder: FormBuilder,
    private router: Router,
    private toast: ToastService) {
    this.subjectSubmissionForm = this.formBuilder.group({
      subjectName: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.message = ''

    this.getAllSubject();
  }

  public getAllSubject() {
    this.subjectService.getAllSubjects().subscribe({
      next: (data: any) => {
        this.subjects = data;
      }
    })
  }

  public getAllTechImage() {
    this.techService.getAllTechnologyStack().subscribe({
      next: (data) => {
        this.techImages = data
      }
    });
  }

  public saveSubject() {
    if (this.subjectSubmissionForm.invalid || this.imageName == '') {
      this.submissionFormFun()
      return;
    } else {
      this.isSubmited = true
      this.subjectService.saveSubject(this.subjectData).subscribe(
        {
          next: (data: any) => {
            this.clearFormSubmission()
            this.subjects.push(data.subject)
            this.toast.showSuccess('Subject Added Successfully!!', 'Success')
            AppUtils.modelDismiss('subject-model-close');
            this.isSubmited = false
           
          },
          error: (error) => {
            this.toast.showError(error.error.message, 'Error')
            this.isSubmited = false
             
          }
        }
      )
    }
  }

  public getSubjectById(id: number) {
    if (this.techImages.length == 0) {
      this.getAllTechImage();
    }
    this.subject = {...this.subjects.find(obj => obj.subjectId == id) as SubjectResponse}
  }

  public updateSubject() {
    if (this.subjectSubmissionForm.invalid && this.imageName == '') {
      this.submissionFormFun()
      return;
    } else {
      this.isSubmittedEdit=true
      this.subjectService.updateSubject(this.subject).subscribe({
        next: (data: any) => {
          this.subjects = this.subjects.map(item => (item.subjectId == data.subjectId ? data : item));
          AppUtils.modelDismiss('subject-edite-modal-close')
          this.toast.showSuccess("subject update successfully!!", 'Success')
          this.isSubmittedEdit=false
        },
        error: (err) => {
          this.toast.showError(err.error.message, 'Error')
          this.isSubmittedEdit=false

        }
      })
    }

  }

  public reloadMessage() {
    this.message = ''
  }

  public deleteSubject() {
    this.subjectService.deleteSubjectById(this.subjectId).subscribe(

      {
        next: (data: any) => {
          this.subjects.splice(this.subjectIndex, 1)
          this.subjectId = 0;
          this.subjectIndex = 0
          this.toast.showSuccess('Subject deleted successfully', 'Success')

        },
        error: (er: any) => {
          this.toast.showError('Error Occure please try again', 'Error')
        }
      }
    )
  }

  public clearFormSubmission() {
    this.message = '';
    this.imageName = ''
    this.subjectSubmissionForm.reset()
  }
  public isFieldInvalidForSubmissionForm(fieldName: string): boolean {
    const field = this.subjectSubmissionForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }
  public submissionFormFun() {
    AppUtils.submissionFormFun(this.subjectSubmissionForm)
  }

  onClick(event: any) {
    if (event.type == "getData") {
      this.getSubjectById(event.id)
    } else if (event.type == "delete") {
      this.subjectId = event.id;
      this.subjectIndex = event.index;
    }
  }
}
