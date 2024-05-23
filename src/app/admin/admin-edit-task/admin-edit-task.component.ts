import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SafeResourceUrl, DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { TaskQuestion } from "src/app/entity/task-question";
import { AssignmentServiceService } from "src/app/service/assignment.service";
import { TaskServiceService } from "src/app/service/task-service.service";
import { ToastService } from "src/app/service/toast.service";
import { AppUtils } from "src/app/utils/app-utils";


@Component({
  selector: 'app-admin-edit-task',
  templateUrl: './admin-edit-task.component.html',
  styleUrls: ['./admin-edit-task.component.scss']
})
export class AdminEditTaskComponent implements OnInit {
  public Editor = ClassicEditor;
  taskForm!: FormGroup;
  videoIframe!: SafeResourceUrl;
  loading = false;

  private questionId!: number;
  private taskId!: number
  private type = '';
  private videoUrl = 'https://www.youtube.com/watch?v=ODLiJ2_CGXI';

  question = new TaskQuestion();
  temp = new TaskQuestion();
  imagePreview: string[] = [];
  imageName: string[] = [];
  updatingImages: File[] = [];


  constructor(
    private toast: ToastService,
    private taskService: TaskServiceService,
    private assignmentService: AssignmentServiceService,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
    private router:Router
  ) {
    this.taskForm = this.formBuilder.group({
      question: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe(params => {
      this.taskId = params['taskId'];
      this.questionId = params['id']
      this.type = params['type'];
      this.loadQuestion();
    });
  }

  loadQuestion() {
    if (this.type === 'assignmentQuestion') {
      this.getAssignmentQuestion(this.questionId);
    } else if (this.type === 'taskQuestion') {
      this.getTaskQuestion(this.questionId);
    }
  }

  getTaskQuestion(taskId: number): void {
    this.taskService.getQuestion(taskId).subscribe({
      next: data => this.handleQuestionResponse(data),
      error: er => this.toast.showError(er.error.message, 'Error')
    });
  }

  getAssignmentQuestion(id: number): void {
    this.assignmentService.getAssignmentQuestionById(id).subscribe({
      next: data => this.handleQuestionResponse(data),
      error: er => this.toast.showError(er.error.message, 'Error')
    });
  }

  handleQuestionResponse(data: any): void {
    this.question = data.question;
    this.temp = { ...data.question };
    this.updateVideoUrl();
  }

  updateVideoUrl(): void {
    this.videoUrl = `https://www.youtube.com/embed/${this.question.videoUrl}`;
    this.videoIframe = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
  }

  addImageFile(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.updatingImages.push(file);
      const reader = new FileReader();
      reader.onload = e => this.handleFileRead(e, file);
      reader.readAsDataURL(file);
    }
  }

  handleFileRead(e: any, file: File): void {
    this.imagePreview.push(e.target.result);
    this.imageName.push(file.name);
  }

  deleteFromQuestion(index: number): void {
    this.modifyArrays(index, this.question.questionImages);
  }

  deleteFromLocal(index: number): void {
    this.modifyArrays(index, this.updatingImages);
  }

  modifyArrays(index: number, array: any[]): void {
    if (index >= 0 && index < array.length) {
      array.splice(index, 1);
      this.imagePreview.splice(index, 1);
      this.imageName.splice(index, 1);
    }
  }

  updateQuestion(): void {
    if (this.taskForm.invalid) {
      AppUtils.submissionFormFun(this.taskForm);
      return;
    }
    this.type === 'assignmentQuestion' ? this.updateDetails(this.assignmentService) : this.updateDetails(this.taskService);
  }

  updateDetails(service: any): void {
    this.loading = true;
    service.updateTaskQuestion(this.question, this.updatingImages, this.taskId).subscribe({
      next: (data: any) => this.handleUpdateResponse(data),
      error: (er: any) => this.toast.showError(er.error.message, 'Error')
    });
  }

  handleUpdateResponse(data: any): void {
    this.question = data.question;
    this.temp = data.question;
    this.clearImages();
    this.toast.showSuccess(data.message, 'Success');
    this.loading = false;
    if(data.isNewTask){
      this.router.navigate(['/admin/createtask/'+data.taskId])
    }
  }

  clearImages(): void {
    this.imagePreview = [];
    this.imageName = [];
    this.updatingImages = [];
  }

  discardChanges(): void {
    this.question = { ...this.temp };
    this.clearImages();
  }
}
