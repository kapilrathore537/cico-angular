import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { an } from '@fullcalendar/core/internal-common';
import { log } from 'console';
import { Course } from 'src/app/entity/course';
import { Subject } from 'src/app/entity/subject';
import { Task } from 'src/app/entity/task';
import { TaskQuestion } from 'src/app/entity/task-question';
import { AssignmentQuestionRequest } from 'src/app/payload/assignment-question-request';
import { TaskQuestionRequest } from 'src/app/payload/task-question-request';
import { TaskRequest } from 'src/app/payload/task-request';
import { CourseServiceService } from 'src/app/service/course-service.service';
import { SubjectService } from 'src/app/service/subject.service';
import { TaskServiceService } from 'src/app/service/task-service.service';
import { ToastService } from 'src/app/service/toast.service';
import { UtilityServiceService } from 'src/app/service/utility-service.service';
import { AppUtils } from 'src/app/utils/app-utils';

@Component({
  selector: 'app-admin-create-task',
  templateUrl: './admin-create-task.component.html',
  styleUrls: ['./admin-create-task.component.scss']
})
export class AdminCreateTaskComponent {
  task: Task = new Task()
  subjects: Subject[] = []
  courses: Course[] = []
  taskId: number = 0;
  question: TaskQuestion = new TaskQuestion()
  public Editor = ClassicEditor;
  questionIndex!: number
  taskData: Task = new Task()

  //taskData: Task = new Task
  taskQuestion: TaskQuestionRequest = new TaskQuestionRequest();
  imagePreview: string[] = [];
  imageName: string[] = [];
  newImg = '';
  attachmentInfo = {
    name: '',
    size: 0
  };
  questionId: number = 0;
  secondTaskForm: FormGroup;
  loading: boolean = false

  constructor(private activateRouter: ActivatedRoute,
    private subjectService: SubjectService,
    private courseService: CourseServiceService,
    private taskService: TaskServiceService,
    private router: Router,
    private utilityService: UtilityServiceService,
    private formBuilder: FormBuilder,
    private toast: ToastService) {

    this.secondTaskForm = this.formBuilder.group({
      question: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.taskId = this.activateRouter.snapshot.params[('id')]
    this.getTask()
  }

  public getTask() {
    this.taskService.getTaskById(this.taskId).subscribe(
      (data: any) => {
        this.task = data.task;
        this.attachmentInfo.name = this.task.taskAttachment != null ? this.task.taskAttachment : ''
        //   this.taskData.taskQuestion = data.taskQuestion;
        this.task.taskQuestion.forEach(() => this.expandedQuestions.push(false));
      }
    )
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

  public deleteTaskQuestion() {
    this.taskService.deleteTaskQuestion(this.questionId).subscribe(
      {
        next: (data: any) => {
          this.task.taskQuestion.splice(this.questionIndex, 1)
          this.toast.showSuccess(data.message, 'Success')
          AppUtils.modelDismiss('delete-task-modal')
        },
        error: (er: any) => {
          this.toast.showError(er.error.message, 'Error')
        }
      }
    )
  }

  setQuestionId(id: number) {
    this.questionId = id;
  }
  at: Boolean = false
  public addAttachmentFile(event: any) {
    const data = event.target.files[0];
    this.attachmentInfo.name = event.target.files[0].name
    this.attachmentInfo.size = Math.floor(((event.target.files[0].size) / 1024) / 1024)
    this.taskData.taskAttachment = event.target.files[0];
    this.taskData.taskId = this.taskId
  }

  public addTaskQuestion() {
    if (this.secondTaskForm.invalid) {
      this.secondFormControl()
      return;
    } else {
      this.loading = true
      this.taskService.addQuestionInTask(this.taskQuestion, this.taskId).subscribe(
        {
          next: (data: any) => {
            this.task.taskQuestion.push(data)
            this.toast.showSuccess('Successfully added', 'Success')
            this.secondTaskForm.reset();
            setTimeout(() => {
              this.loading = false
              this.taskQuestion = new TaskQuestionRequest();
              this.imagePreview = [];
              this.imageName = [];
            }, 1000);
          },
          error: (errore) => {
            this.toast.showError('Error occure', 'Error')
          }
        }
      )

    }
  }

  public submitTask() {

    if (this.attachmentInfo.name != null) {

      this.taskService.addAssignment(this.taskData)
        .subscribe({
          next: (data: any) => {
            this.at = false
            alert('Success..')
            // this.router.navigate(['/admin/task']);
          }
        })
    } else {
      this.at = true
      return
    }

  }
  public addImageFile(event: any) {
    console.log(event);
    this.taskQuestion.questionImages.push(event.target.files[0]);

    const selectedFile = event.target.files[0];

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
  expandedQuestions: boolean[] = [];
  toggleQuestion(index: number) {
    this.expandedQuestions[index] = !this.expandedQuestions[index];
  }


  public deleteImage(index: number) {
    if (index >= 0 && index < this.taskQuestion.questionImages.length) {
      this.taskQuestion.questionImages.splice(index, 1);
      this.imagePreview.splice(index, 1);
      this.imageName.splice(index, 1);
    }
  }

  isFieldInvalidForSecondTaskForm(fieldName: string): boolean {
    const field = this.secondTaskForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  public secondFormControl() {
    AppUtils.submissionFormFun(this.secondTaskForm)
  }

  public pageRenderUsingRouterLink(path: string, questionId: number) {
    const dataParams = {
      id: questionId,
      type: "taskQuestion"
    };
    this.router.navigate([path], {
      queryParams: dataParams
    });
  }

  deleteAttachement() {
    this.taskService.deleteAttachement(this.taskId).subscribe({
      next: (data: any) => {
        this.toast.showSuccess('success', '');
        this.attachmentInfo.name = ''
        AppUtils.modelDismiss('delete-task-modal1')
      }
    })
  }
}
