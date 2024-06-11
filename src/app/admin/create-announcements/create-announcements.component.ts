import { Router } from '@angular/router';
import { AnnouncementRequest } from './../../payload/announcement-request';
import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/entity/course';
import { AnnouncementServiceService } from 'src/app/service/announcement-service.service';
import { CourseServiceService } from 'src/app/service/course-service.service';
import { UtilityServiceService } from 'src/app/service/utility-service.service';
import Swal from 'sweetalert2';
import * as SockJS from 'sockjs-client';
import *  as Stomp from "stompjs";
import { id } from 'date-fns/locale';
import { disconnect } from 'process';
import { WebsocketServiceDiscussionFormService } from 'src/app/service/websocket-service-discussion-form-service.service';
@Component({
  selector: 'app-create-announcements',
  templateUrl: './create-announcements.component.html',
  styleUrls: ['./create-announcements.component.scss']
})
export class CreateAnnouncementsComponent implements OnInit {

  courses: Course[] = [];
  announcementRequest: AnnouncementRequest = new AnnouncementRequest;
  selectedCourseIds: number[] = [];
  selectedCourses: Course[] = [];
  selectAll: boolean = true;
  SOCKET_URL = this.utilityService.getBaseUrl() + '/socket'
  isSubmit:boolean=false;


  constructor(private courseService: CourseServiceService,
    private utilityService: UtilityServiceService,
    private announcementService: AnnouncementServiceService,
    private router: Router,
    private websocketService: WebsocketServiceDiscussionFormService) { }

  ngOnInit(): void {
    this.getAllCourses();
   // this.connect()
  }

  public getAllCourses() {
    this.courseService.getAllCourses(0, 10).subscribe({
      next: (data: any) => {
        this.courses = data.response;
      }
    })
  }

  public publishAnnouncement() {
    this.isSubmit=true

    this.announcementService.publishAnnouncement(this.announcementRequest).subscribe({
      next: (data: any) => {
        //let courses: number[] = []
       /// data.course.forEach((e: any) => {
       //   courses.push(e.courseId);
       // });

       console.log('admin');
     
       
        let obj = {
          type: 'announcement',
          date: data.date,
          message: data.message,
          title: data.title,
          announcementId: data.announcementId,
          allCourse: this.announcementRequest.courseId
        }

        Swal.fire('Announcement Published').then(e => {
          this.router.navigate(['/admin/announcements']);
        })
        this.sendMessage(obj);
        console.log(obj);
       
      },
      error: (err: any) => {
        this.isSubmit=false

      }
    })
  }

  // connect() {
  //   this.websocketService.getMessages().subscribe((message) => {

  //   });
  // }

  public sendMessage(message: any) {
    this.websocketService.sendMessage(message);
  }

  public clearObj() {
    this.announcementRequest = new AnnouncementRequest;
  }

  public checkboxChanged(courseId: number) {
    const index = this.announcementRequest.courseId.indexOf(courseId);

    if (index === -1) {
      this.announcementRequest.courseId.push(courseId);
    } else {
      this.announcementRequest.courseId.splice(index, 1);
    }
  }

  selectAllChanged() {
    if (!this.selectAll) {
      this.announcementRequest.courseId = [];
    }
    else {
      for (let i = 0; i < this.courses.length; i++) {
        this.announcementRequest.courseId[i] = this.courses[i].courseId;
      }
    }
  }

  public checkCourse(id: number) {
    if (this.announcementRequest.courseId.find(e => e == id))
      return true
    return false;
  }

}
