import { HttpClient } from '@angular/common/http';
import { AnnouncementRequest } from './../payload/announcement-request';
import { UtilityServiceService } from './utility-service.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementServiceService {

  BASE_URL = this.utilityService.getBaseUrl();
  ANNOUNCEMENT_URL = this.BASE_URL + '/announcement';
  cacheData: any;
  dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private utilityService: UtilityServiceService,
    private http: HttpClient) { }

  public publishAnnouncement(request: AnnouncementRequest) {
    return this.http.post(`${this.ANNOUNCEMENT_URL}/publishAnnouncement`, request);
  }

  public getAllPublishedAnnouncement(page: number, size: number) {
    return this.http.get(`${this.ANNOUNCEMENT_URL}/getAllAnnouncement?page=${page}&size=${size}`);
  }


  public getAnnouncementForStudent(studentId: any) {
    if (this.cacheData)
      return this.dataSubject.asObservable()
    else {
      this.http.get(`${this.ANNOUNCEMENT_URL}/getAnnouncementForStudent?studentId=${studentId}`).subscribe({
        next: (data: any) => {
          this.cacheData = data;
          this.dataSubject.next(data);
        }
      })
    }
    return this.dataSubject.asObservable();

  }

  public seenMassageByStudent(announcementId: number, studentId: number) {
    return this.http.post(`${this.ANNOUNCEMENT_URL}/seenAnnouncement?announcementId=${announcementId}&studentId=${studentId}`, null);
  }

  public countUnseenNotificationForStudent(studentId: number) {
    return this.http.get(`${this.ANNOUNCEMENT_URL}/getNotificationCountForStudent?studentId=${studentId}`);
  }


}
