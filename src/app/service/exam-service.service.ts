import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilityServiceService } from './utility-service.service';
import { ChapterExamResultResponse } from '../payload/chapter-exam-result-response';

@Injectable({
  providedIn: 'root'
})
export class ExamServiceService {


  BASE_URL = this.utilityService.getBaseUrl();
  EXAM_URL = this.BASE_URL + '/exam';

  constructor(private http: HttpClient, private utilityService: UtilityServiceService) { }

  public addChapterExam(data: ChapterExamResultResponse) {
    return this.http.post(`${this.EXAM_URL}/addChapterExam`, data)
  }
  addSubjectExam(data: ChapterExamResultResponse) {
    return this.http.post(`${this.EXAM_URL}/addSubjectExamResult`, data)
  }


  public getChapterExamResult(id: number) {
    return this.http.get(`${this.EXAM_URL}/getChapterExamResult?resultId=${id}`);
  }

  public getExamResultByChpaterIdAndStudentId(chapterId: number, studentId: number) {
    return this.http.get(`${this.EXAM_URL}/getExamResultByChapterIdAndStudentId?chapterId=${chapterId}&studentId=${studentId}`);
  }

  public getChapterExamIsCompleted(chapterId: number, studentId: number) {
    return this.http.get(`${this.EXAM_URL}/checkExamCompleteOrNot?chapterId=${chapterId}&studentId=${studentId}`);
  }

  public getSubectExamIsCompleteOrNot(subjectId: any, studentId: any) {
    return this.http.get(`${this.EXAM_URL}/getSubectExamIsCompleteOrNot?subjectId=${subjectId}&studentId=${studentId}`);
  }

  public getAllChapterExamResultByChaterId(chapterId: number) {
    return this.http.get(`${this.EXAM_URL}/getALLChapterExamResultesByChapterIdApi?chapterId=${chapterId}`);
  }
  public geSubjectExamResultByExamId(resultId: number) {
    return this.http.get(`${this.EXAM_URL}/getSubjectExamResult?resultId=${resultId}`)
  }

  getALLSubjectExamResultesBySubjectId(subjectExamId: number) {
    return this.http.get(`${this.EXAM_URL}/getALLSubjectExamResultesBySubjectId?examId=${subjectExamId}`)
  }

  public getSubjectExamResult(resultId: number) {
    return this.http.get(`${this.EXAM_URL}/getSubjectExamResult?resultId=${resultId}`)
  }

}
