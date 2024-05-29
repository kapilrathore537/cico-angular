import { Injectable, OnInit } from '@angular/core';
import { UtilityServiceService } from './utility-service.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { LoginService } from './login.service';
import { Exam } from '../entity/exam';
import { ht } from 'date-fns/locale';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  public getAllChapterWithSubjectId(id: number) {
    return this.http.get(`${this.Subject_url}/getAllChapterWithSubjectId?subjectId=${id}`);
  }

  BASE_URL = this.utilityService.getBaseUrl();
  Subject_url = this.BASE_URL + '/subject';
  Chapter_url = this.BASE_URL + '/chapter';
  Question_url = this.BASE_URL + '/question'
  EXAM_URL = this.BASE_URL + '/exam'

  constructor(private utilityService: UtilityServiceService, private http: HttpClient, private loginService: LoginService) { }

  public saveSubject(subject: any) {
    return this.http.post(`${this.Subject_url}/addSubject?subjectName=${subject.subjectName}&imageId=${subject.imageId}`, {
      responseType: 'any'
    });
  }

  public getAllSubjectQuestion(subjectId: number) {
    return this.http.get<any>(`${this.Question_url}/getAllSubjectQuestionBySubjectId?subjectId=${subjectId}`)
  }

  public getAllSubjects() {
    return this.http.get(`${this.Subject_url}/getAllSubjects`);
  }
  public getAllSubjectsWithChapterCompletedStatus() {

    return this.http.get(`${this.Subject_url}/getAllSubjectsWithChapterCompletedStatus/${this.loginService.getStudentId()}`);
  }
  public getSubjectById(id: number) {
    return this.http.get(`${this.Subject_url}/getSubjectById?subjectId=${id}`);
  }

  public updateSubject(subject: any) {
    return this.http.put(`${this.Subject_url}/updateSubject`, subject);
  }

  public getAllSubjectChapters(id: number) {
    return this.http.get(`${this.Chapter_url}/getAllChapters?subjectId=${id}`)
  }
  public deleteSubjectById(id: number) {
    return this.http.put(`${this.Subject_url}/deleteSubjectById?subjectId=${id}`, null)
  }

  public getAllSubjectsByCourseId(courseId: any) {
    return this.http.get<any>(`${this.Subject_url}/getAllSubjectsByCourseId?courseId=${courseId}`)
  }
  getAllChapterWithSubjectIdAndStudentId(id: number, studentId: number) {
    return this.http.get<any>(`${this.Subject_url}/getAllChapterWithSubjectIdAndStudentId?subjectId=${id}&studentId=${studentId}`)
  }

  addSubjectExam(exam: Exam) {
    return this.http.post(`${this.EXAM_URL}/addSubjectExam`, exam)
  }

  getAllSubjectExamNormalAndSchedule(subjectId: number) {
    return this.http.get(`${this.EXAM_URL}/getAllSubjectNormalAndScheduleExam?subjectId=${subjectId}`)
  }

  public updateSubjectExam(updateExam: Exam) {
    return this.http.put(`${this.EXAM_URL}/updateSubjectExam`, updateExam)
  }
  deleteSubjectExam(examId: number) {
    return this.http.delete(`${this.EXAM_URL}/deleteSubjectExam?examId=${examId}`)
  }


  activateExam(examId: number | undefined) {
    return this.http.put(`${this.EXAM_URL}/changeSubjectExamStatus?examId=${examId}`, null)
  }

}
