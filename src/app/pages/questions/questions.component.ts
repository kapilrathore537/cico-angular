import { AfterViewInit, Component, HostListener, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { Chapter } from 'src/app/entity/chapter';
import { QuizeQuestion } from 'src/app/entity/quize-question';
import { Exam } from 'src/app/enum/exam';
import { ChapterExamResultResponse } from 'src/app/payload/chapter-exam-result-response';
import { ChapterServiceService } from 'src/app/service/chapter-service.service';
import { ExamServiceService } from 'src/app/service/exam-service.service';
import { LoginService } from 'src/app/service/login.service';
import { QuestionServiceService } from 'src/app/service/question-service.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements AfterViewInit {
  chapterId: number = 0;
  index: number = 0
  questions: QuizeQuestion[] = []
  question: QuizeQuestion = new QuizeQuestion();
  previousButton: boolean = false;
  nextButton: boolean = false;
  questionClicked = new Map<number, string>();
  questionAnswered: number = 0;
  questionView: number = 0;
  questionNotAnswered: number = 0
  options: string = ''
  remainingTime: any;
  second: any
  timerSubscription: Subscription | undefined;
  chapterExamResultResponse = new ChapterExamResultResponse
  subjectExamResultResponse = new ChapterExamResultResponse
  subjectId: number = 0;
  chapter = new Chapter;
  totalQuestion = 0;
  questionNumber = 1;

  unrelatedActivityDetected = false;
  subjectExamId!: number
  type!: string
  subjectTimer!: number

  constructor(private questionService: QuestionServiceService, private activateRouter: ActivatedRoute,
    private chapterService: ChapterServiceService,
    private router: Router,
    private loginService: LoginService,
    private examServiceService: ExamServiceService) {
    this.questionClicked = new Map<number, string>();
    this.toggleFullScreen()
  }

  ngAfterViewInit(): void {
    if (this.type == Exam.subjectExam) {
      this.getSubjectExamQuestion();
    } else {
      this.getChapeter();
    }
  }

  ngOnInit() {
    this.activateRouter.queryParams.subscribe((params: any) => {
      if (params['type'] == Exam.subjectExam) {
        this.subjectExamId = params['subjectExamId']
      } else {
        this.chapterId = params['chapterId'];
      }
      this.type = params['type'];
      this.subjectId = params['subjectId'];
    });
  }


  public getSubjectExamQuestion() {
    this.questionService.getAllSubjectExamQuestion(this.subjectExamId, this.loginService.getStudentId()).subscribe({

      next: (data: any) => {
        this.subjectTimer = data.timer;
        this.question = data.questions
        this.questions = data.questions
        this.question = this.questions[0];
        this.questionNotAnswered = this.questions.length;
        this.toggleFullScreen()
        setTimeout(() => {
          this.timer();
        
        }, 500);
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    })
  }

  public timer() {
    const duration = 60 * (this.type == Exam.chapterExam ? this.chapter.exam.examTimer! : this.subjectTimer)// in seconds
    this.timerSubscription = timer(0, 1000).subscribe((elapsedTime: any) => {
      this.second = duration - elapsedTime;
      this.remainingTime = new Date(this.second * 1000).toISOString().substr(11, 8);
      if (elapsedTime >= duration) {
        this.timerSubscription?.unsubscribe();
        this.type == Exam.subjectExam ? this.SubjectExamsubmittion() : this.submittion()
      }
    });
  }

  public submittion() {
    this.chapterExamResultResponse.chapterId = this.chapterId
    this.chapterExamResultResponse.studentId = this.loginService.getStudentId()
    this.chapterExamResultResponse.review = Object.fromEntries(this.questionClicked.entries());
    this.chapterExamResultResponse.subjectId = this.subjectId
    this.examServiceService.addChapterExam(this.chapterExamResultResponse).subscribe(
      (data: any) => {
        let params = {
          resultId: data.id,
          type: Exam.chapterExamResult
        }
        this.router.navigate(['result'], {
          queryParams: params
        })
      }
    )
  }

  public SubjectExamsubmittion() {
    this.subjectExamResultResponse.studentId = this.loginService.getStudentId()
    this.subjectExamResultResponse.review = Object.fromEntries(this.questionClicked.entries());
    this.subjectExamResultResponse.subjectId = this.subjectId
    this.subjectExamResultResponse.examId = this.subjectExamId
    this.subjectExamResultResponse.questionList = this.questions.map(obj => obj.questionId) as number[]

    this.examServiceService.addSubjectExam(this.subjectExamResultResponse).subscribe(
      {
        next: (data: any) => {
          let params = {
            resultId: data.id,
            type: Exam.subjectExamResult
          }
          this.router.navigate(['result'], {
            queryParams: params
          })
        }
      }
    )

  }

  public nextQuestion(id: number) {
    if (this.index == this.questions.length - 1) {
      this.nextButton = true;
    }
    else {
      ++this.questionView
      this.nextButton = false
      this.previousButton = false;
      this.question = this.questions[++this.index]
      this.questionNumber++;
    }
  }

  public previousQuestion() {
    if (this.index == 0) {
      this.previousButton = true
    }
    else {
      this.previousButton = false;
      this.nextButton = false
      this.question = this.questions[--this.index]
      this.questionNumber--;
    }

  }

  questionClick(option: string, index: number) {

    if (this.questionClicked.get(index) == null) {
      ++this.questionAnswered
      --this.questionNotAnswered
      this.questionClicked.set(index, option);
    } else {
      this.questionClicked.set(index, option);
    }

  }

  isFullScreen = false;

  @HostListener('window:keydown', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    // Check for the keys you want to handle, including the Windows (Super) key
    if (
      event.key.startsWith('F') || // Function keys
      event.key == 'Escape' || // Esc
      event.key == 'Tab' || // Tab
      event.key == 'CapsLock' || // Caps Lock
      event.key == 'Shift' || // Shift
      event.key == 'Control' || // Ctrl
      event.key == 'Alt' || // Alt
      event.key == 'Insert' || // Insert
      event.key == 'Delete' || // Delete
      event.key == 'Meta' // Windows (Super) key
    ) {

      this.type == Exam.subjectExam ? this.SubjectExamsubmittion() : this.submittion();
      // Call your submission function                 // commented 24
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove() {
    if (this.unrelatedActivityDetected) {
      // Automatically submit the test if unrelated activity persists
      // alert("submit");
    } else {
      // Show a warning if unrelated activity is detected
      this.showWarning();
      this.unrelatedActivityDetected = true
    }
  }
  public showWarning() {
    //  alert("Please Don't Change the Window otherwise it will autosubmit");
  }

  // toggleFullScreen() {
  //   const element = document.documentElement;
  //   if (!this.isFullScreen) {
  //     if (element.requestFullscreen) {
  //       element.requestFullscreen();
  //       console.log("if");

  //     }
  //   } else {
  //     if (document.exitFullscreen) {
  //       document.exitFullscreen();
  //       console.log('else');

  //     }
  //   }
  //   this.isFullScreen = !this.isFullScreen;
  // }

  toggleFullScreen() {
    const element = document.documentElement;

    if (!this.isFullScreen) {
      // Enter fullscreen mode
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
    } else {
      // Exit fullscreen mode
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }

    // Toggle the fullscreen state
    this.isFullScreen = !this.isFullScreen;
  }

  public getChapeter() {
    this.chapterService.getChapterById(this.chapterId).subscribe(
      (data: any) => {
        this.questions = this.shuffleList(data.chapter.exam.questions);
        this.question = this.questions[0];
        this.questionNotAnswered = this.questions.length;
        this.chapter = data.chapter;
        this.timer();
        this.toggleFullScreen()
      }
    )
  }

  public shuffleList<T>(list: T[]): T[] {
    return [...list].sort(() => Math.random() - 0.5);
  }

  public clickQuitButton() {
    Swal.fire({
      title: 'Are you sure ?',
      text: 'you want quit the test',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // this.toggleFullScreen()
        //this.router.navigate(['/student/chapterDetails/' + this.chapterId])
        this.timerSubscription?.unsubscribe();
        //  this.submittion();
        this.type == Exam.subjectExam ? this.SubjectExamsubmittion() : this.submittion();
      }
    })
  }

  public clickSubmitButton() {
    Swal.fire({
      title: 'Are you sure ?',
      text: 'you want submit the test',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // this.toggleFullScreen()
        // this.router.navigate(['/student/chapterDetails/' + this.chapterId])
        this.timerSubscription?.unsubscribe();
        //  this.submittion();

        alert(this.type)
        this.type == Exam.subjectExam ? this.SubjectExamsubmittion() : this.submittion();
      }
    })
  }

  public manageQuestionProgressBar(questionId: number) {
    if (this.questionClicked.has(questionId)) {
      // Value is present in the map
      return true;
    } else {
      // Value is not present in the map
      return false;
    }
  }
}
