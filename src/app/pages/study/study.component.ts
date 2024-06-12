import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Chapter } from 'src/app/entity/chapter';
import { Subject } from 'src/app/entity/subject';
import { TechnologyStack } from 'src/app/entity/technology-stack';
import { SubjectResponse } from 'src/app/payload/subject-response';
import { LoginService } from 'src/app/service/login.service';
import { SubjectService } from 'src/app/service/subject.service';
import { UtilityServiceService } from 'src/app/service/utility-service.service';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss'],
})
export class StudyComponent {

  subjects: SubjectResponse[] = [];
  subject: Subject = new Subject();
  incodedId: number = 0;
  constructor(private subjectService: SubjectService) { }

  ngOnInit() {
    this.getAllSubject()
  }

  public getAllSubject() {
    this.subjectService.getAllSubjectsWithChapterCompletedStatus().subscribe({
      next: (data: any) => {
        this.subjects = data;
        console.log(this.subjects+"cxvcx");
        
      },
    });
  }

  progressWidth: string = '';
  calculatePercentages(num1: number, num2: number) {
    let per: any;
    per = Math.floor((num1 / num2) * 100);
    if (num1 == 0) {
      per = 0
    }
    return per;
  }
  // Encoding an ID
  //   let originalData = new ArrayBuffer(this.subject.subjectId);
  //let encodedString = encodingService.encodeToBase64(originalData);

  // Decoding the encoded data
  //const decodedData = decodingService.decodeFromBase64(encodedString);

  // public navigate(id: number) {
  //   let originalData = new ArrayBuffer(id);
  //   let encodedString = this.utilityService.encodeToBase64(originalData);
  //   this.router.navigate(['/student/chapter/'+encodedString])
  // }
}
