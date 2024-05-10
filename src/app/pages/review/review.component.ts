import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChapterExamResult } from 'src/app/entity/chapter-exam-result';
import { QuizeQuestion } from 'src/app/entity/quize-question';
import { Question } from 'src/app/entity/question';
import { QuestionResponse } from 'src/app/payload/question-response';
import { ExamServiceService } from 'src/app/service/exam-service.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  resultId = 0
  chapterExamResult: ChapterExamResult = new ChapterExamResult
  questionResponse: QuestionResponse[] = []
  review = new Map<number, string>;
  question: QuizeQuestion[] = []
  type!: string
  constructor(private activateRoute: ActivatedRoute, private examService: ExamServiceService, private router: Router) { }
  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((param: any) => {
      this.resultId = param['resultId'],
        this.type = param['type']

    })

    if (this.type == "subjectExamReview") { 
      this.examService.geSubjectExamResultByExamId(this.resultId).subscribe({
        next: (data: any) => {
          this.chapterExamResult = data.examResult
          this.questionResponse = data.questions
          this.review = new Map<number, string>(
            Object.entries(this.chapterExamResult.review).map(([key, value]) => [Number(key), value])
          );
        },
        error: (er: any) => {

        }
      })
    } else if (this.type == "chapterExamReview") {
      this.examService.getChapterExamResult(this.resultId).subscribe({
        next: (data: any) => {
          this.chapterExamResult = data.examResult
          this.questionResponse = data.questions
          this.review = new Map<number, string>(
            Object.entries(this.chapterExamResult.review).map(([key, value]) => [Number(key), value])
          );
        }
      })
    }

  }
  resultView() {
    let params = {
      resultId: this.resultId,
      type: this.type == "chapterExamReview" ? "chapterExamResult" : "subjectExamResult"
    }
    this.router.navigate(['result'], {
      queryParams: params
    })
  }
}
