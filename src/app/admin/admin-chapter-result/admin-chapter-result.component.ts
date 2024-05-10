import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamServiceService } from 'src/app/service/exam-service.service';
import { UtilityServiceService } from 'src/app/service/utility-service.service';

@Component({
  selector: 'app-admin-chapter-result',
  templateUrl: './admin-chapter-result.component.html',
  styleUrls: ['./admin-chapter-result.component.scss']
})
export class AdminChapterResultComponent implements OnInit {

  chapterExamResult: any
  chapterId: number = 0;
  type!: string
  subjectExamId!: number;

  constructor(private examService: ExamServiceService, private activateRoute: ActivatedRoute, private utilityService: UtilityServiceService) { }
  ngOnInit(): void {

    this.activateRoute.queryParams.subscribe((params: any) => {

      if (params['type'] == "subjectExam") {
        this.subjectExamId = params['subjectExamId']
        this.showSubjectExamResult(params['subjectExamId'])
      } else {
        this.chapterId = params['chapterId'];
        this.showChapterExamResult(params['chapterId']);
      }
      this.type = params['type'];
    });
  }

  showChapterExamResult(chapterId: any) {
    this.examService.getAllChapterExamResultByChaterId(chapterId).subscribe((data: any) => {
      this.chapterExamResult = data.examResult
    })
  }

  showSubjectExamResult(subjectExamId: number) {
    this.examService.getALLSubjectExamResultesBySubjectId(subjectExamId).subscribe({
      next: (data: any) => {
        this.chapterExamResult = data.examResult
      },
      error: (er: any) => {

      }
    })
  }
}
