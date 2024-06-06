import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { clear } from 'console';
import { uniqueDates } from 'igniteui-angular/lib/core/utils';
import { StudentTaskSubmittion } from 'src/app/entity/student-task-submittion';
import { Task } from 'src/app/entity/task';
import { LoginService } from 'src/app/service/login.service';
import { TaskServiceService } from 'src/app/service/task-service.service';
import { ToastService } from 'src/app/service/toast.service';
import { UtilityServiceService } from 'src/app/service/utility-service.service';
import { AppUtils } from 'src/app/utils/app-utils';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent {

  taskId: number = 0;
  task = new Task();
  taskSubmittion: StudentTaskSubmittion = new StudentTaskSubmittion();
  submissionForm: FormGroup;
  isSubmittedTask: boolean = false
  taskAttachment: boolean = false
  loading: boolean = false;

  constructor(private taskService: TaskServiceService,
    private router: ActivatedRoute,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private toast: ToastService) {
    this.submissionForm = this.formBuilder.group({
      file: ['', Validators.required],
      taskDescription: ['', Validators.required]
    });
    this.router.params.subscribe(data => {
      this.taskId = data['id'];
    })
  }

  ngOnInit() {
    this.getTask();
  }
  public getTask() {
    this.taskService.getTaskById(this.taskId).subscribe(
      (data: any) => {
        this.task = data.task;
        if (this.task.taskAttachment != null)
          this.taskAttachment = true
        this.isSubmitted()
      }
    )
  }

  public submitTask() {
    if (this.task.attachmentStatus == "Optional" || this.task.attachmentStatus == "Not Allowed") {
      this.submissionForm.removeControl('file');
      if (this.submissionForm.invalid) {
        AppUtils.submissionFormFun(this.submissionForm)
        return;
      } else {
        this.taskSubmit();
      }
    }
    else {
      if (this.submissionForm.invalid) {
        AppUtils.submissionFormFun(this.submissionForm)
        return;
      } else {
        this.taskSubmit();
      }
    }
  }


  taskSubmit() {
    this.loading = true;
    this.taskSubmittion.studentId = this.loginService.getStudentId();
    this.taskService.submitTask(this.taskSubmittion, this.taskId).subscribe(
      {
        next: (data) => {
          this.taskSubmittion = new StudentTaskSubmittion
          this.submissionForm.reset()
          this.isSubmittedTask = false
          AppUtils.modelDismiss('close-task-submission-form')
          this.toast.showSuccess('Task successfully submitted', 'Success')
          this.loading = false;
        },
        error: (er) => {
          this.toast.showError(er.error.message, 'Error')
          this.loading=false;
        }
      }
    )
  }

  public setImage(event: any) {
    this.taskSubmittion.submittionFileName = event.target.files[0];
  }


  isImageExpanded = false;

  toggleImageSize(event: Event) {
    const image = event.target as HTMLImageElement;
    this.isImageExpanded = !this.isImageExpanded;

    if (this.isImageExpanded) {
      image.classList.add('expanded');
    } else {
      image.classList.remove('expanded');
    }
  }


  public isFieldInvalidForSubmissionForm(fieldName: string): boolean {
    const field = this.submissionForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  public isSubmitted() {
    this.taskService.isSubmitted(this.task.taskId, this.loginService.getStudentId()).subscribe(
      (data: any) => {
        if (data == true)
          this.isSubmittedTask = false
        else
          this.isSubmittedTask = true
      }
    )
  }

  public deleteFile() {
    this.taskSubmittion.submittionFileName = null;
    const control = this.submissionForm.get('file');
    control?.setValidators([]);
    control?.setErrors(null);
    control!.setErrors({ 'required': true });

  }
  public resetForm() {
    this.taskSubmittion.submittionFileName = null;
    this.submissionForm.reset();
  }
}

