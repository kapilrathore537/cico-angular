import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { isThisHour } from 'date-fns';
import { TaskQuestion } from 'src/app/entity/task-question';
import { TaskQuestionRequest } from 'src/app/payload/task-question-request';
import { AssignmentServiceService } from 'src/app/service/assignment.service';
import { TaskServiceService } from 'src/app/service/task-service.service';
import { ToastService } from 'src/app/service/toast.service';
import { UtilityServiceService } from 'src/app/service/utility-service.service';

@Component({
  selector: 'app-admin-edit-task',
  templateUrl: './admin-edit-task.component.html',
  styleUrls: ['./admin-edit-task.component.scss']
})
export class AdminEditTaskComponent implements OnInit {

  question = new TaskQuestion()
  message!: string
  imagePreview: string[] = [];
  imageName: string[] = []
  updatingImages: File[] = []
  temp = new TaskQuestion();
  taskId!: number;

  public Editor = ClassicEditor;
  type: string = ''
  videoUrl: string = 'https://www.youtube.com/watch?v=ODLiJ2_CGXI';
  videoIframe!: SafeResourceUrl;
  constructor(
    private toast: ToastService,
    private taskService: TaskServiceService,
    private activateRoute: ActivatedRoute,
    private assignmentService: AssignmentServiceService,
    private sanitizer: DomSanitizer) {
  }

  updateVideoUrl() {
    this.videoUrl = `https://www.youtube.com/embed/${this.question.videoUrl}`;
    this.videoIframe = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
  }

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((queryParams) => {
      this.taskId = queryParams['id'];
      this.type = queryParams['type'];

      if (this.type == "assignmentQuestion") {
        this.getAssignmentQuestion(this.taskId);
      } else if (this.type == 'taskQuestion') {
        this.getTaskQuestion(this.taskId);

      }
    });
  }

  public getTaskQuestion(taskId: number) {
    this.taskService.getQuestion(taskId).subscribe({
      next: (data: any) => {

        this.question = data.question;
        this.temp = { ...data.question };
        this.updateVideoUrl()
      },
      error: (er: any) => {
        this.toast.showError(er.error.message, 'Error')
      }
    })
  }



  public getAssignmentQuestion(id: any) {
    this.assignmentService.getAssignmentQuestionById(id).subscribe({
      next: (data: any) => {

        this.question = data.question;
        this.temp = { ...data.question };
        this.updateVideoUrl()
      },
      error: (er: any) => {
        this.toast.showError(er.error.message, 'Error')
      }
    })
  }

  public deleteFromQuestion(index: number) {
    if (index >= 0 && index < this.question.questionImages.length) {
      this.question.questionImages.splice(index, 1);
      this.imagePreview.splice(index, 1);
      this.imageName.splice(index, 1);
    }
  }
  public deleteFromLocal(index: number) {
    this.imagePreview.splice(index, 1);
    this.imageName.splice(index, 1);
    this.updatingImages.splice(index, 1)
  }

  public addImageFile(event: any) {
    const selectedFile = event.target.files[0];
    this.updatingImages.push(event.target.files[0])
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview.push(e.target.result);
        this.imageName.push(selectedFile.name);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      this.imagePreview.push('');
      this.imageName.push('');
    }
  }
  url: string = '';

  public updateAssignmenQuestion() {
    this.assignmentService.updateQuestion(this.question, this.updatingImages).subscribe({
      next: (data: any) => {
        this.updatingImages = []
        this.question = data.question;
        this.temp = data.question;
        this.imagePreview = []
        this.imageName = []
        this.toast.showSuccess('Successfully updated!!', 'success')
      },
      error: (er: any) => {
        this.toast.showError(er.error.message, 'Error')
      }
    })
  }
  public taskQuestionUpdate() {
    this.taskService.updateTaskquestion(this.question, this.updatingImages).subscribe({
      next: (data: any) => {
        this.updatingImages = []
        this.question = data.question;
        this.temp = data.question;
        this.imagePreview = []
        this.imageName = []
        this.toast.showSuccess('Successfully updated!!', 'success')
      },
      error: (er: any) => {
        this.toast.showError(er.error.message, 'Error')
      }
    })
  }

  updateQuestion() {
    if (this.type == "assignmentQuestion") {
      this.updateAssignmenQuestion();
    } else {
      this.taskQuestionUpdate();
    }
  }

  public discardChanges() {
    this.question = { ...this.temp }
    this.imagePreview = []
    this.imageName = []
    this.updatingImages = []
  }
}
