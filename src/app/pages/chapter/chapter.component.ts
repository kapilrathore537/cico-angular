import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chapter } from 'src/app/entity/chapter';
import { Subject } from 'src/app/entity/subject';
import { ChapterResponse } from 'src/app/payload/chapter-response';
import { ChapterServiceService } from 'src/app/service/chapter-service.service';
import { LoginService } from 'src/app/service/login.service';
import { SubjectService } from 'src/app/service/subject.service';
import { UtilityServiceService } from 'src/app/service/utility-service.service';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss']
})
export class ChapterComponent {

  subjectId: number = 0;
  chapter: Chapter[] = []
  subject: Subject = new Subject();
  subjectName!: string
  constructor(private activateRouter: ActivatedRoute,
    private subjectService: SubjectService,
    private chapterService: ChapterServiceService,
    private utilityService: UtilityServiceService,
    private router: Router,
    private loginService: LoginService) { }
  chapterResponse: ChapterResponse[] = []
  ngOnInit() {
    this.subjectId = this.activateRouter.snapshot.params[('id')];
    this.getAllChapters(this.subjectId);
  }

  public getAllChapters(id: number) {
    this.subjectService.getAllChapterWithSubjectIdAndStudentId(id, this.loginService.getStudentId()).subscribe({
      next: (data: any) => {
        this.chapterResponse = data.chapters
        this.subjectName = data.subjectName
      }
    })
  }

  public pageRenderUsingRouterLink(path: string, chapterId: number) {
    const dataParams = {
      subjectId: this.subjectId,
      chapterId: chapterId,
    };
    this.router.navigate([path], {
      queryParams: dataParams
    });
  }

}
