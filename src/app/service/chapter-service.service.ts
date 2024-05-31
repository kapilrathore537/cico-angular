import { Injectable } from '@angular/core';
import { UtilityServiceService } from './utility-service.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { Chapter } from '../entity/chapter';
import { ChapterContent } from '../entity/chapter-content';
import { Subject } from '../entity/subject';
@Injectable({
  providedIn: 'root'
})
export class ChapterServiceService {


  BASE_URL = this.utilityService.getBaseUrl();
  CHAPTER_URL = this.BASE_URL + '/chapter';

  constructor(private utilityService: UtilityServiceService, private http: HttpClient) { }

  // public getAllChapter(id: number) {
  //   return this.http.get(`${this.CHAPTER_URL}/getAllChapters?subjectId=${id}`)
  // }
  public getChapterById(id: number): Observable<Chapter> {
    return this.http.get<Chapter>(`${this.CHAPTER_URL}/getChapterById?chapterId=${id}`)
  }
  public getChapterExamQuestions(id: number) {
    return this.http.get<Chapter>(`${this.CHAPTER_URL}/getChapterExamQuestions?chapterId=${id}`)
  }

  public getChapterContentWithChapterIdForAdmin(chapterId: number) {
    return this.http.get<any>(`${this.CHAPTER_URL}/getChapterContentWithChapterIdForAdmin?chapterId=${chapterId}`)
  }

  public addChapterContent(data: ChapterContent, chapterId: number) {
    let formData = new FormData();
    formData.append('chapterId', chapterId.toString());
    formData.append('title', data.title);
    formData.append('subTitle', data.subTitle);
    formData.append('content', data.content);
    return this.http.post(`${this.CHAPTER_URL}/addChapterContent`, formData);
  }
  public updateChapterContent(data: ChapterContent) {
    let formData = new FormData();
    formData.append('title', data.title);
    formData.append('subTitle', data.subTitle);
    formData.append('content', data.content);
    formData.append('contentId', data.id.toString())
    return this.http.put(`${this.CHAPTER_URL}/updateChapterContent`, formData);
  }
  public getChapterContent(contentId: number): Observable<ChapterContent> {
    let params = new HttpParams();
    params = params.append('chapterContentId', contentId)
    return this.http.get<ChapterContent>(`${this.CHAPTER_URL}/getChapterContent`, { params })
  }
  public deleteContent(contentId: number) {
    let formData = new FormData();
    formData.append('contentId', contentId.toString());
    return this.http.put(`${this.CHAPTER_URL}/deleteChapterContent`, formData);
  }
  public addChapter(subjectId: number, chapterName: string): Observable<Subject> {
    let formData = new FormData();
    formData.append('subjectId', subjectId.toString());
    formData.append('chapterName', chapterName)
    return this.http.post<Subject>(`${this.CHAPTER_URL}/addChapter`, formData);
  }

  public deleteChapter(chapterId: number) {
    let formData = new FormData();
    formData.append('chapterId', chapterId.toString());
    return this.http.put(`${this.CHAPTER_URL}/deleteChapter`, formData);
  }
  public updateChapter(chapterId: number, chapterName: string, subjectId: number) {

    let formData = new FormData();
    formData.append('chapterId', chapterId.toString());
    formData.append('chapterName', chapterName);
    formData.append('subjectId', subjectId.toString())
    return this.http.put(`${this.CHAPTER_URL}/updateChapter`, formData);
  }

 

}
