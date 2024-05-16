import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { error, log } from 'console';
import { ToastrService } from 'ngx-toastr';
import { Chapter } from 'src/app/entity/chapter';
import { QuizeQuestion } from 'src/app/entity/quize-question';
import { Subject } from 'src/app/entity/subject';
import { TechnologyStack } from 'src/app/entity/technology-stack';
import { ChapterResponse } from 'src/app/payload/chapter-response';
import { ChapterServiceService } from 'src/app/service/chapter-service.service';
import { SubjectService } from 'src/app/service/subject.service';
import { TechnologyStackService } from 'src/app/service/technology-stack-service.service';
import { ToastService } from 'src/app/service/toast.service';
import { AppUtils } from 'src/app/utils/app-utils';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuestionServiceService } from 'src/app/service/question-service.service';
import { QuestionResponse } from 'src/app/payload/question-response';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Exam } from 'src/app/entity/exam';
declare var $: any;
@Component({
  selector: 'app-admin-subjects-chapter',
  templateUrl: './admin-subjects-chapter.component.html',
  styleUrls: ['./admin-subjects-chapter.component.scss']
})
export class AdminSubjectsChapterComponent implements AfterViewInit {
  chapter: Chapter[] = []
  subjects: Subject[] = [];
  subjectId: number = 0;
  chapterName: string = ''
  message: string = '';
  chapterId = 0;
  subjectExamId!: number
  chapterUpdate: ChapterResponse = new ChapterResponse()
  id: number = 0;
  questionId: number = 0;

  imageName = ''
  techImages: TechnologyStack[] = [];
  chapterIndex: number = 0;
  chapterResponse: ChapterResponse[] = []
  image: File | null = null;
  examForm!: FormGroup
  chapterForm!: FormGroup
  exam = new Exam()
  scheduleExam: Exam[] = []
  normlaExam: Exam[] = []
  updateExam = new Exam();
  questionForm!: FormGroup
  totalChapterExamQuestion: any;
  questions: QuizeQuestion[] = []
  questionIndex!: number;
  public Editor = ClassicEditor;
  question: QuizeQuestion = new QuizeQuestion();
  examType!: string;
  appUtil = AppUtils;
  isExam: any


  constructor(private subjectService: SubjectService,
    private route: ActivatedRoute,
    private chapterService: ChapterServiceService,
    private techService: TechnologyStackService,
    private router: Router,
    private toast: ToastService, private formBuilder: FormBuilder, private questionService: QuestionServiceService) {

    this.route.queryParams.subscribe(param => {
      this.subjectId = param['subjectId']
    })

    this.chapterForm = this.formBuilder.group({
      chapterName: ['', Validators.required],

    });
    this.questionForm = this.formBuilder.group({
      correctOption: ['', Validators.required],
      option4: ['', Validators.required],
      option3: ['', Validators.required],
      option2: ['', Validators.required],
      option1: ['', Validators.required],
      questionContent: ['', Validators.required]
    });
    this.initiaLiseExamform();
  }

  initiaLiseExamform() {
    this.examForm = this.formBuilder.group({
      totalQuestionForTest: ['', [Validators.required, Validators.min(1), Validators.max(this.questions.length + this.totalChapterExamQuestion)]],
      examTimer: ['', Validators.required],
      examName: ['', Validators.required],
      passingMarks: ['', Validators.required],
    })
  }

  ngOnInit() {

    this.getSubjectChapters(this.subjectId)
    this.techService.getAllTechnologyStack().subscribe({
      next: (data) => {
        this.techImages = data
      }
    });

    this.getAllExams();
    this.getAllSubjectQuestion();
    setTimeout(() => {
      this.initiaLiseExamform();
    }, 1000);
  }
  public isFieldInvalidForExamForm(fieldName: string): boolean {
    return AppUtils.isFormFieldValid(fieldName, this.examForm)
  }

  public ExamsubmissionFormFun() {
    AppUtils.submissionFormFun(this.examForm)
  }

  public getSubjectChapters(subjectId: number) {
    this.subjectService.getAllChapterWithSubjectId(subjectId).subscribe({
      next: (data: any) => {
        this.chapterResponse = data.chapters
      }
    })
  }

  public addChapter() {
    if (this.chapterForm.invalid) {
      AppUtils.submissionFormFun(this.chapterForm);
      return;
    } else {
      this.chapterService.addChapter(this.subjectId, this.chapterUpdate.chapterName.trim()).subscribe(
        {
          next: (data: any) => {
            this.chapterResponse.push(data.chapter)
            AppUtils.modelDismiss('chapter-save-modal')
            this.toast.showSuccess('Chapter added successfully!!', 'Success')
          },
          error: (error) => {
            this.toast.showError(error.error.message, 'Error')
          }
        }
      )
    }
  }
  public deleteChapter() {
    this.chapterService.deleteChapter(this.chapterId).subscribe(
      {
        next: (data: any) => {
          this.chapterResponse.splice(this.chapterIndex, 1)
          this.chapterId = 0;
          this.chapterIndex = 0
          this.toast.showSuccess('chapter deleted successfully!!', 'Success')
        },
        error: (error) => {
          this.toast.showError(error.error.message, 'Error')
        }
      }
    )
  }
  public cancel() {
    this.chapterUpdate = new ChapterResponse();
  }
  public reload() {
    this.message = ''
    this.chapterUpdate = new ChapterResponse();
  }

  public updateChapter() {
    if (this.chapterForm.invalid) {
      AppUtils.submissionFormFun(this.chapterForm);
      return;
    } else {
      this.chapterService.updateChapter(this.chapterId, this.chapterUpdate.chapterName, this.subjectId).subscribe(
        {
          next: (data) => {
            let ch = this.chapterResponse.find(obj => obj.chapterId === this.chapterId) as ChapterResponse
            ch.chapterName = this.chapterUpdate.chapterName;
            this.chapterId = this.chapterId;
            ch.chapterId = this.chapterUpdate.chapterId
            AppUtils.modelDismiss('chapter-update-modal')
            this.toast.showSuccess('Chapter updated successfully!!', 'success')
          },
          error: (error) => {
            this.toast.showError(error.error.message, 'Error')
          }
        }
      )
    }
  }
  public getChapterById(id: number) {
    this.chapterId = id;
    this.chapterUpdate = { ... this.chapterResponse.find(obj => obj.chapterId == id) as ChapterResponse };
  }

  public clearExamForm() {
    this.examForm.reset();
  }

  examId!: number
  public pageRenderUsingRouterLink(path: string, chapterId?: number) {
    const dataParams = {
      subjectId: this.subjectId,
      chapterId: chapterId,
      type: "subjectExamQuestion",
      examId: this.examId
    };
    this.router.navigate([path], {
      queryParams: dataParams
    });
  }

  pageRender(path: string, chapterId?: number) {
    const dataParams = {
      subjectId: this.subjectId,
      chapterId: chapterId,
      type: "subjectExamQuestion",
      examId: this.examId
    };
    AppUtils.pageRendering(path, dataParams)
  }

  public addExam() {
    if (this.examForm.invalid) {
      this.ExamsubmissionFormFun();
      return;
    } else {
      this.exam.examType = this.examType
      this.exam.subjectId = this.subjectId
      this.subjectService.addSubjectExam(this.exam).subscribe({
        next: (data: any) => {
          AppUtils.modelDismiss('close-exam-add-form')
          this.toast.showSuccess(data.message, 'Success')
          if (data.subjectExam.examType == "NORMALEXAM")
            this.normlaExam.push(data.subjectExam)
          else if (data.subjectExam.examType == "SCHEDULEEXAM")
            this.scheduleExam.push(data.subjectExam)
        },
        error: (er: any) => {
          this.toast.showError(er.error.message, 'Error')
        }
      })
    }
  }
  setExamType(type: string) {
    this.examType = type
  }
  index!: number

  deleteExam() {
    this.subjectService.deleteSubjectExam(this.examId).subscribe({
      next: (data: any) => {
        if (this.examType == "NORMALEXAM") {
          this.normlaExam.splice(this.index, 1);
        } else {
          this.scheduleExam.splice(this.index, 1);
        }
        this.toast.showSuccess(data.message, 'Success')
      },
      error: (er: any) => {
        this.toast.showError(er.error.message, 'Error')
      }
    })
  }

  getAllExams() {
    this.subjectService.getAllSubjectExamNormalAndSchedule(this.subjectId).subscribe({
      next: (data: any) => {
        this.normlaExam = data.normlaExam;
        this.scheduleExam = data.scheduleExam;
      },
      error: (er: any) => {

      }
    })
  }

  setExamId(id: any) {
    this.subjectExamId = id as number
    let text = document.getElementById('exampleModalLabel1')
    text!.innerText = "Edit Exam";
  }

  public updateSubjectExam() {

    this.subjectService.updateSubjectExam(this.exam).subscribe({
      next: (data: any) => {
        this.toast.showSuccess(data.message, 'Success');
        if (data.exam.examType == "NORMALEXAM") {
          this.normlaExam = this.normlaExam.map(obj => (obj.examId == data.exam.examId ? data.exam : obj))
        } else if (data.exam.examType == "SCHEDULEEXAM")
          this.scheduleExam = this.scheduleExam.map(obj => (obj.examId == data.exam.examId ? data.exam : obj))

        // this.examForm.reset()
        // this.updateExam = new Exam();
        // this.exam = new Exam();
        AppUtils.modelDismiss('exam_modal_close')
      },
      error: (er: any) => {
        this.toast.showError(er.error.message, 'Error')
      }
    })
  }

  clearChapterForm() {
    this.chapterForm.reset();
  }



  public clearFormSubmission() {
    this.questionForm.reset()
  }
  public isFieldInvalidForSubmissionForm(fieldName: string): boolean {
    const field = this.questionForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }
  public submissionFormFun() {
    AppUtils.submissionFormFun(this.questionForm)
  }

  public getAllSubjectQuestion() {
    this.subjectService.getAllSubjectQuestion(this.subjectId).subscribe(
      {
        next: (data: any) => {
          this.questions = data.questions;
          this.totalChapterExamQuestion = data.questionCount;
          this.initiaLiseExamform()

        },
        error: (er: any) => {
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
    this.questionService.updateQuestionById(this.question).subscribe(
      {
        next: (data: any) => {
          AppUtils.modelDismiss('quize-save-modal')
          this.questions[this.questionIndex] = data.question
          this.cancel()
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

  public setQuestion(id: number, index: number) {
    this.questionIndex = index;
    this.questionId = id;
    this.isEdit = true;
    this.question = { ...this.questions.find(obj => obj.questionId === id) as QuestionResponse }
    document.getElementById('addQuestion')!.innerText = 'Update Question'
  }
  isEdit: boolean = false;

  addUpdateQuestion() {
    if (this.isEdit) {
      if (this.questionForm.invalid) {
        AppUtils.submissionFormFun(this.questionForm);
        return
      } else {
        this.updateQuestion();
      }
      this.isEdit = false;
    } else {
      if (this.questionForm.invalid) {
        AppUtils.submissionFormFun(this.questionForm);
        return
      } else {
        this.addQuestion();
      }
    }
  }

  handleImageInput(event: any) {
    this.question.questionImage = event.target.files[0];
  }

  public addQuestion() {
    if (this.questionForm.invalid) {
      this.submissionFormFun()
    } else {
      this.questionService.addQuestionToSubjectExam(this.question, this.subjectId).subscribe(
        {
          next: (data) => {
            this.questions.push(data)
            this.question = new QuizeQuestion();
            AppUtils.modelDismiss('quize-save-modal')
            this.toast.showSuccess('Quize successfully added!!', 'Success')
          },
          error: (er) => {
            this.toast.showError(er.error.message, 'Error')
          }
        }
      )
    }
  }

  clearExam() {
    this.examForm.reset();
    this.exam = new Exam();
    this.isExam = 'add'
    this.changeFormName('Add Exam');
    this.isScheduleFieldOpen = true;
  }

  isScheduleFieldOpen: boolean = true;

  openScheduleFieldForEdit() {
    this.addScheduleFormField();
    this.isScheduleFieldOpen = false;
    this.changeFormName('Update  Schedule Exam')

  }
  addUpdateExams() {
    if (this.isExam == 'edit') {
      if (this.examForm.invalid) {
        AppUtils.submissionFormFun(this.examForm);
        return;
      } else {
        this.updateSubjectExam()
      }
    } else if (this.isExam == 'add') {
      this.addExam();
    }
  }



  isScheduleForm: boolean = false
  public openScheduleField() {
    var checkbox = document.querySelector('input[type="checkbox"]') as HTMLInputElement;
    this.isScheduleForm = checkbox!.checked
    if (checkbox!.checked) {
      this.addScheduleFormField();
      this.exam.examType = 'SCHEDULEEXAM'
      this.changeFormName('Add Schedule Exam');
    } else {
      this.removeScheduleFormField();
      this.changeFormName('Add  Exam');
      this.exam.examType = 'NORMALEXAM'
    }
  }

  removeScheduleFormField() {
    this.examForm.removeControl('examStartTime');
    this.examForm.removeControl('scheduleTestDate');
    // this.isScheduleFieldOpen = false;
    this.changeFormName('Update Exam');

  }
  changeFormName(type: string) {
    document.getElementById('addExam')!.innerText = type
  }

  addScheduleFormField() {
    this.examForm.addControl('examStartTime', this.formBuilder.control('', Validators.required));
    this.examForm.addControl('scheduleTestDate', this.formBuilder.control('', Validators.required));
  }

  onClick(event: any) {
    if (event.type == "getData") {
      this.getChapterById(event.id)
    } else if (event.type == "delete") {
      this.chapterId = event.id;
      this.chapterIndex = event.index;
    }
  }

  getNormalExamById(id: any,) {
    this.isScheduleForm = false
    this.exam = { ...this.normlaExam.find(obj => obj.examId == id)! }
  }


  getScheduleExamById(id: number) {
    this.isScheduleForm = true
    this.exam = { ...this.scheduleExam.find(obj => obj.examId == id)! }
  }

  onClickForExam(event: any) {
    this.openScheduleFieldForEdit()
    if (event.type == "getData") {
      this.isExam = 'edit'
      if (event.examType == "SCHEDULEEXAM") {
        this.getScheduleExamById(event.id);
      } else {
        if (event.examType == "NORMALEXAM") {
          this.getNormalExamById(event.id)
        }
      }
    } else if (event.type == "delete") {
      this.examType = event.examType
      this.examId = event.id
      this.index = event.index
    }
  }

  ngAfterViewInit(): void {

  }

  clearQuestionForm() {
    this.questionForm.reset();
    document.getElementById('addQuestion')!.innerText = 'Add Question'
  }
}