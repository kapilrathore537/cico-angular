import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { UtilityServiceService } from './utility-service.service';
import { NewsAndEventRequest } from '../payload/news-and-event-request';
import { NewsAndEvent } from '../entity/news-and-event';

@Injectable({
  providedIn: 'root'
})
export class NewsEventServiceService {


  BASE_URL = this.utilityService.getBaseUrl();
  newsEventUrl = this.BASE_URL + '/newsEvents';

  constructor(private http: HttpClient, private utilityService: UtilityServiceService) { }

  public getAllNewsAndEvents(page: number, size: number) {
    return this.http.get(`${this.newsEventUrl}/getAllNewsEvents?page=${page}&size=${size}`);
  }

  public getAllNewsAndEventsIsActive(page: number, size: number) {
    return this.http.get(`${this.newsEventUrl}/getAllNewsEventsIsActive?page=${page}&size=${size}`);
  }

  public updateActiveAndInActive(id: number) {
    return this.http.put(`${this.newsEventUrl}/activeAndInActiveNewsAndEvent?id=${id}`, {
      responseType: 'any'
    })
  }

  public deleteNewsAndEvents(id: number) {
    return this.http.delete(`${this.newsEventUrl}/deleteNewsEvents?id=${id}`);
  }

  public searchNewsAndEvents(search: string, role: string, page: number, size: number) {
    return this.http.get(`${this.newsEventUrl}/searchNewsAndEvents?search=${search}&role=${role}&page=${page}&size=${size}`);
  }

  public getByNewsById(id: number) {
    return this.http.get(`${this.newsEventUrl}/getNewsEvents?id=${id}`);
  }

  public createNewsAndEvent(data: NewsAndEventRequest) {
    var formData = new FormData();
    console.log(data);

    formData.append('shortDescriptoin', data.shortDescription)
    formData.append('briefDescription', data.briefDescription)
    formData.append('title', data.title)
    formData.append('fileName', data.fileName)

    return this.http.post<NewsAndEvent>(`${this.newsEventUrl}/createNewsEvents`, formData)
  }

  public updateNewsAndEvent(data: NewsAndEventRequest) {


    var formData = new FormData();
    console.log(data);
    formData.append('id', data.id.toString())
    formData.append('shortDescriptoin', data.shortDescription)
    formData.append('briefDescription', data.briefDescription)
    formData.append('title', data.title)
    if (data.fileName instanceof File)
      formData.append('fileName', data.fileName)

    return this.http.put<NewsAndEvent>(`${this.newsEventUrl}/updateNewsEvents`, formData)
  }
}

