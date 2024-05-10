import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SubjectExamResponse } from 'src/app/payload/subject-exam-response';
import { LoginService } from 'src/app/service/login.service';
import { QuestionServiceService } from 'src/app/service/question-service.service';
import { UtilityServiceService } from 'src/app/service/utility-service.service';
import { Router } from '@angular/router';
import { Exam } from 'src/app/enum/exam';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit, AfterViewInit {


  subjectExamResponse: SubjectExamResponse[] = []
  scheduleExam: SubjectExamResponse[] = []
  normlaExam: SubjectExamResponse[] = []


  isExamStart: boolean = false
  resultId!: number
  exam: boolean = false
  isCompleted = false;
  timerSubscription: any;
  date: any

  constructor(private router: Router,
    private questionService: QuestionServiceService,
    private loginService: LoginService,
    private utilityService: UtilityServiceService) {
    this.utilityService.getCurrentDate().subscribe(
      (data: any) => {
        this.date = data
        console.log('Data received:', data);
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
  ngOnInit(): void {
    this.getAllExam();
  }

  getAllExam() {
    this.questionService.getAllSubjectExam(this.loginService.getStudentId()).subscribe({
      next: (data: any) => {
        this.normlaExam = data.normlaExam
        this.scheduleExam = data.scheduleExam
        setTimeout(() => {
          this.scheduleExam.forEach(exam => this.startExamTimer(exam));
        }, 500);
      },
      error: (er: any) => {

      }
    })
  }
  ngAfterViewInit(): void {

  }

  startTest(examId: any, subjectId: any) {
    let params = {
      subjectExamId: examId,
      type: Exam.subjectExam,
      subjectId: subjectId
    }
    this.router.navigate(['/questions'], {
      queryParams: params
    });
  }

  viewExamReview(resultId: any) {
    let params = {
      resultId: resultId,
      type: Exam.subjectExamReview
    }
    this.router.navigate(['/review'], {
      queryParams: params
    })
  }

  startExamTimer(exam: SubjectExamResponse): void {
    
    if (exam.scheduleTestDate == this.date.date && !exam.isExamEnd) {
      this.updateRemainingTime(exam);
      exam.intervalId = setInterval(() => {
        !exam.isExamStarted ? this.updateRemainingTime(exam) : clearInterval(exam.intervalId)
      }, 1000);
    }
  }


  private updateRemainingTime(exam: SubjectExamResponse): void {

    const now = new Date()//this.date.actualDate
    const startTimeParts = exam.examStartTime.split(/[\s:]+/);
    let hours = parseInt(startTimeParts[0], 10);
    const minutes = parseInt(startTimeParts[1], 10);

    const startTime = new Date(exam.scheduleTestDate);
    startTime.setHours(hours, minutes, 0, 0);

    let timeDiff = startTime.getTime() - now.getTime();
    const hoursRemaining = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutesRemaining = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const secondsRemaining = Math.floor((timeDiff % (1000 * 60)) / 1000);

    if (timeDiff <= 0) {
      clearInterval(exam.intervalId);
      exam.isExamStarted = true
      this.startExamTime(exam);
    } else if (minutesRemaining < 10) {

      if (minutesRemaining >=1) {
        exam.remainingTime = `${minutesRemaining}m ${secondsRemaining}s`;
      } else {
        exam.remainingTime = `${secondsRemaining}s`;
      }
    } else if(minutesRemaining >60){
      exam.remainingTime = `${hoursRemaining}h ${minutesRemaining}m ${secondsRemaining}s`;
    }else{
      exam.remainingTime = `${minutesRemaining}m ${secondsRemaining}s`;
    }
  }

  // extra time for test  
  startExamTime(exam: SubjectExamResponse): void {
    setInterval(() => {
      exam.isExamStarted && !exam.isExamEnd ? this.updateExtraTime(exam) : ''
    }, 1000);
  }

  private updateExtraTime(exam: SubjectExamResponse): void {
    const now = new Date()// this.date.actualDate
    const startTimeParts = exam.examStartTime.split(/[\s:]+/);
    let hours = parseInt(startTimeParts[0], 10);
    const minutes = parseInt(startTimeParts[1], 10) + exam.extraTime;
    const startTime = new Date(exam.scheduleTestDate);
    startTime.setHours(hours, minutes, 0, 0);
    let timeDiff = startTime.getTime() - now.getTime();
    if (timeDiff <= 0) {
      exam.isExamEnd = true
    }
  }
}
