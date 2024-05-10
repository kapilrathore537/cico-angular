import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilityServiceService } from './utility-service.service';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class DiscussionFormServiceService {
  

  BASE_URL = this.utilityService.getBaseUrl();
  URL = this.BASE_URL + '/discussionForm';

  constructor(private http: HttpClient, private utilityService: UtilityServiceService) { }

  public createDiscussionForm(studentId: number, content: string, file: string, audioFile: string) {
    let data = new FormData
    data.append('content', content)
    data.append('studentId', studentId.toString())
    data.append('file', file)
    data.append('audioFile', audioFile)
    return this.http.post(`${this.URL}/createDiscussionForm`, data)
  }

  public getDiscussionFormById(id: number) {
    return this.http.get(`${this.URL}/getDiscussionFormById?id=${id}`);
  }

  public getAllDiscussionForm(id: number) {
    return this.http.get(`${this.URL}/getAllDiscussionForm?studentId=${id}`);
  }

  public creatCommnet(studentId: number, discussionFormId: number, content: string) {
    let data = new FormData
    data.append('studentId', studentId.toString())
    data.append('content', content)
    data.append('discussionFormId', discussionFormId.toString())
    return this.http.post(`${this.URL}/createComment`, data);
  }

  public addOrRemoveLike(studentId: number, discussionFormId: number) {
    let data = new FormData
    data.append('studentId', studentId.toString())
    data.append('discussionFormId', discussionFormId.toString())
    return this.http.post(`${this.URL}/addOrRemoveLike`, data)
  }

  public removeComment(discussionFormId: number, commentsId: number) {

    return this.http.delete(`${this.URL}/removeComment?discussionFormId=${discussionFormId}&commentsId=${commentsId}`)
  }

  search(search: any) {
    return this.http.get(`${this.URL}/searchingDiscussionForm?search=${search}`)
  }
}
