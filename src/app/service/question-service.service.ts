import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilityServiceService } from './utility-service.service';
import { Observable } from 'rxjs';
import { QuizeQuestion } from '../entity/quize-question';
import { ex } from '@fullcalendar/core/internal-common';

@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {


  BASE_URL = this.utilityService.getBaseUrl();
  QUESTION_URL = this.BASE_URL + '/question';
  EXAM_URL = this.BASE_URL + '/exam'

  constructor(private utilityService: UtilityServiceService, private http: HttpClient) { }
  public getAllQuestionByChapterId(chapterId: number): Observable<QuizeQuestion[]> {
    return this.http.get<QuizeQuestion[]>(`${this.QUESTION_URL}/getAllQuestionByChapterId?chapterId=${chapterId}`);
  }
  public deleteQuestionById(questionId: number) {
    return this.http.put(`${this.QUESTION_URL}/deleteQuestionById?questionId=${questionId}`, null)
  }
  public getQuestionById(questionId: number): Observable<QuizeQuestion> {
    return this.http.get<QuizeQuestion>(`${this.QUESTION_URL}/getQuestionById?questionId=${questionId}`);
  }
  public updateQuestionById(question: QuizeQuestion,examId:number,type :number) {
    
    let formData = new FormData();
    formData.append('questionContent', question.questionContent);
    formData.append('correctOption', question.correctOption)
    formData.append('option1', question.option1)
    formData.append('option2', question.option2)
    formData.append('option3', question.option3)
    formData.append('option4', question.option4)
    formData.append('examId', examId.toString())
    formData.append('type',type.toString())
    formData.append('questionId', question.questionId.toString())
    formData.append('image', question.questionImage)
    return this.http.put(`${this.QUESTION_URL}/updateQuestionById`, formData);
  }
  public addQuestion(question: QuizeQuestion, chapterId: number): Observable<QuizeQuestion> {

    let formData = new FormData();
    formData.append('chapterId', chapterId.toString())
    formData.append('questionContent', question.questionContent);
    formData.append('correctOption', question.correctOption)
    formData.append('option1', question.option1)
    formData.append('option2', question.option2)
    formData.append('option3', question.option3)
    formData.append('option4', question.option4)
    formData.append('image', question.questionImage)

    return this.http.post<QuizeQuestion>(`${this.QUESTION_URL}/addQuestionToChapter`, formData)
  }

  public addQuestionToSubjectExam(question: QuizeQuestion, subjectId: number): Observable<QuizeQuestion> {

    let formData = new FormData();
    formData.append('subjectId', subjectId.toString())
    formData.append('questionContent', question.questionContent);
    formData.append('correctOption', question.correctOption)
    formData.append('option1', question.option1)
    formData.append('option2', question.option2)
    formData.append('option3', question.option3)
    formData.append('option4', question.option4)
    formData.append('image', question.questionImage)

    return this.http.post<QuizeQuestion>(`${this.QUESTION_URL}/addQuestionToSubject`, formData)
  }
  public getAllSubjectExam(studentId: any) {
    return this.http.get(`${this.EXAM_URL}/getAllSubjectNormalAndScheduleExamForStudent?studentId=${studentId}`)
  }
  getAllSubjectExamQuestion(examId: number, studentId: number) {
    return this.http.get(`${this.QUESTION_URL}/getAllSubjectQuestionForTest?examId=${examId}&studentId=${studentId}`)
  }
}
