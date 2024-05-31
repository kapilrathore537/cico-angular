import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ex } from '@fullcalendar/core/internal-common';
import { ChapterContent } from 'src/app/entity/chapter-content';
import { ChapterContentResponse } from 'src/app/payload/chapter-content-response';
import { ChapterServiceService } from 'src/app/service/chapter-service.service';
import { ExamServiceService } from 'src/app/service/exam-service.service';
import { LoginService } from 'src/app/service/login.service';
import { SubjectService } from 'src/app/service/subject.service';

@Component({
  selector: 'app-subjectdetails',
  templateUrl: './subjectdetails.component.html',
  styleUrls: ['./subjectdetails.component.scss']
})
export class SubjectdetailsComponent {
  chapterId: number = 0;
  subjectId: number = 0;
  chapterContent: ChapterContent = new ChapterContent();
  chapterName: string = '';
  questionsInChapter = 0;
  isCompleted = false;
  resultId = 0;
  exam: boolean = false
  isQuizeFound: boolean = false;
  isExamActivate!:Boolean
  chapterContentResponse: ChapterContentResponse[] = [];
  constructor(
    private chapterService: ChapterServiceService,
    private examService: ExamServiceService,
    private loginService: LoginService,
    private acitvateRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.acitvateRoute.queryParams.subscribe(params => {
      this.chapterId = params['chapterId'];
      this.subjectId = params['subjectId'];
    });
    this.getChapter();
    this.getChapterExamIsComplete();
  }
  public getChapter() {
    this.chapterService.getChapterContentWithChapterIdForAdmin(this.chapterId).subscribe(
      (data: any) => {

        this.chapterContentResponse = data.chapterContent
        this.questionsInChapter = this.chapterContentResponse.length
        if (this.chapterContentResponse.length == 0)
          this.isQuizeFound = true
        this.chapterName = data.chapterName;
        this.isExamActivate = data.isExamActivate

      }
    )
  }


  // public getChapterContent(contentId: number) {
  //   this.chapterService.getChapterContent(this.chapterId).subscribe(
  //     (data) => {
  //       this.chapterContent = data;
  //     }
  //   )
  // }
  

  public pageRenderUsingRouterLink(path: string, chapterId: number) {
    const dataParams = {
      subjectId: this.subjectId,
      chapterId: chapterId,
      type: "chapterExam"
    };
    this.router.navigate([path], {
      queryParams: dataParams
    });
  }

  public getReview() {
    const dataParams = {
      resultId: this.resultId,
      type: "chapterExamResult"
    };
    this.router.navigate(['result'], {
      queryParams: dataParams
    });
  }

  public getChapterExamIsComplete() {
    this.examService.getChapterExamIsCompleted(this.chapterId, this.loginService.getStudentId()).subscribe({
      next: (data: any) => {

        if (data.status) {
          this.exam = false
          this.isCompleted = true;
          this.resultId = data.resultId;
        } else {
          this.isCompleted = false
        }
        if (data.message == "takeATest") {
          this.exam = true
        }
      },
      error: (err) => {
      }
    })
  }

}
