import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChapterExamResult } from 'src/app/entity/chapter-exam-result';
import { ExamServiceService } from 'src/app/service/exam-service.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit ,AfterViewInit {

  resultId = 0
  chapterExamResult: ChapterExamResult = new ChapterExamResult
  type!: string
  localst: any;
  constructor(private activateRoute: ActivatedRoute, private examService: ExamServiceService, private router: Router) { }
  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((param: any) => {
      this.type = param['type']
      this.resultId = param['resultId']
    })
    setTimeout(() => {
      if (this.type == "chapterExamResult") {
        this.examService.getChapterExamResult(this.resultId).subscribe({
          next: (data: any) => {
            this.chapterExamResult = data.examResult;
          }
        })

      } else if (this.type == "subjectExamResult") {

        this.examService.getSubjectExamResult(this.resultId).subscribe({
          next: (data: any) => {
            this.chapterExamResult = data.examResult
          },
          error: (er: any) => {

          }
        });
      }
    }, 500);

    // ************ PREVENT BACK BUTTON **************************

    history.pushState(null, '', location.href);
    this.localst.onPopState(() => {
      history.pushState(null, '', location.href);
    });

  }

  isFullScreen = true;
  toggleFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      this.isFullScreen = !this.isFullScreen;
    }
  }
  exite() {
    this.toggleFullScreen();
    this.router.navigate(['/student/'])
  }

  viewReview() {
    let params = {
      resultId: this.resultId,
      type: this.type == "chapterExamResult" ? "chapterExamReview" : "subjectExamReview"
    }
    this.router.navigate(['review'], {
      queryParams: params
    })
  }
}
