import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizeQuestion } from 'src/app/entity/quize-question';
import { QuestionServiceService } from 'src/app/service/question-service.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChapterServiceService } from 'src/app/service/chapter-service.service';
import { QuestionResponse } from 'src/app/payload/question-response';
import { AppUtils } from 'src/app/utils/app-utils';
import { ToastService } from 'src/app/service/toast.service';
import { ExamServiceService } from 'src/app/service/exam-service.service';
@Component({
  selector: 'app-admin-subjects-chapter-quiz',
  templateUrl: './admin-subjects-chapter-quiz.component.html',
  styleUrls: ['./admin-subjects-chapter-quiz.component.scss']
})
export class AdminSubjectsChapterQuizComponent {

  questionId: number = 0;
  questions!: QuizeQuestion[]
  chapterId: number = 0;
  question: QuizeQuestion = new QuizeQuestion();
  public Editor = ClassicEditor;
  image: File | null = null;
  submissionForm: FormGroup
  subjectId: number = 0;
  questionIndex = 0;
  type!: string;
  examId!: number
  formType!: number;
  isActive!: boolean

  constructor(private activateRouter: ActivatedRoute,
    private questionService: QuestionServiceService,
    private router: Router,
    private formBuilder: FormBuilder,
    private chapterService: ChapterServiceService,
    private toast: ToastService,
    private examService: ExamServiceService) {

    this.submissionForm = this.formBuilder.group({
      correctOption: ['', Validators.required],
      option4: ['', Validators.required],
      option3: ['', Validators.required],
      option2: ['', Validators.required],
      option1: ['', Validators.required],
      questionContent: ['', Validators.required]
    });

    this.questions = []
  }
  ngOnInit() {
    this.activateRouter.queryParams.subscribe(params => {
      this.chapterId = params['chapterId'];
      this.examId = params['examId'];
      this.subjectId = params['subjectId']
    });
    this.getAllQuestions();
  }
  public addQuestion() {

    this.questionService.addQuestion(this.question, this.chapterId).subscribe(
      {
        next: (data) => {
          this.questions.push(data)
          AppUtils.modelDismiss('quize-save-modal')
          this.toast.showSuccess('Quize successfully added!!', 'Success')
        },
        error: (er) => {
          this.toast.showError('Error please try again!!', 'Error')
        }
      }
    )

  }
  handleImageInput(event: any) {
    this.question.questionImage = event.target.files[0];
  }

  public getAllQuestions() {
    this.chapterService.getChapterExamQuestions(this.chapterId).subscribe(
      {
        next: (data: any) => {
          this.questions = data.questions;
          this.activeStatus = data.isActive;
        },
        error: (er) => {
        }
      }
    )
  }
  public deleteQuestion() {
    this.questionService.deleteQuestionById(this.questionId).subscribe(
      {
        next: (data) => {
          this.questionId = 0;
          this.questions.splice(this.questionIndex, 1);
          AppUtils.modelDismiss('delete-quize-modal')
          this.toast.showSuccess('Successfully deleted', 'Sucsess')
        },
        error: (error) => {
          this.toast.showError('Error', 'Error')
        }
      }
    )
  }

  public updateQuestion() {
    this.questionService.updateQuestionById(this.question, this.examId, 1).subscribe(
      {
        next: (data: any) => {
          AppUtils.modelDismiss('quize-save-modal')
          this.questions[this.questionIndex] = data.question;
          this.toast.showSuccess(data.message, 'Success')
        },
        error: (error) => {
          this.toast.showError(error.error.message, 'Error')
        }
      }
    )

  }

  public getQuestionById(id: number) {
    this.questionService.getQuestionById(id).subscribe(
      (data) => {
        this.question = data;
      }
    )
  }

  public cancel() {
    this.question = new QuizeQuestion();
    this.submissionForm.reset();
    this.formType = 1 // for add question
    this.changeFormName('Add Question', 'Add')
  }

  changeFormName(formName: string, buttonName: string) {
    document.getElementById('exampleModalLabel1')!.innerText = formName;
    document.getElementById('buttonName')!.innerText = buttonName
  }


  public isFieldInvalidForSubmissionForm(fieldName: string): boolean {
    const field = this.submissionForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  public pageRenderUsingRouterLink(path: string) {
    const dataParams = {
      subjectId: this.subjectId,
      chapterId: this.chapterId,
    };
    this.router.navigate([path], {
      queryParams: dataParams
    });
  }

  public setQuestion(id: number, index: number) {
    this.questionIndex = index
    this.formType = 2;
    this.changeFormName('Update Question', 'Update')
    this.question = { ...this.questions.find(obj => obj.questionId === id) as QuestionResponse }
  }


  public activateExam() {
    this.examService.changeStatus(this.examId).subscribe({
      next: (data: any) => {
        this.activeStatus = data.isActive;
        this.toast.showSuccess('Successfully updated', 'Success');
        return true;
      },
      error: (er: any) => {
        this.toast.showError(er.error.message, 'error');
        this.activeStatus = this.activeStatus;
        return false;
      }
    })
    return true;
  }

  activeStatus: boolean = false

  title1:string='Do you really want to activate the exam? The exam cannot be deactivated once it has started.'
  title2:string='You can inactivate once there are no submissions or no one has started the exam.'
  beforeToggle(event: Event) {
    let proceed = confirm(!this.activeStatus?this.title1:this.title2);
    if (proceed) {
      proceed = this.activateExam()
      if (!proceed) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  addUpdateQuestion() {
    if (this.submissionForm.invalid) {
      AppUtils.submissionFormFun(this.submissionForm)
    } else {
      if (this.formType) {
        if (this.formType == 1) {
          this.addQuestion()
        } else if (this.formType == 2) {
          this.updateQuestion();
        }
      }
    }
  }
}
