import { Component, OnInit } from '@angular/core';
import { dt } from '@fullcalendar/core/internal-common';
import { error, log } from 'console';
import { Announcement } from 'src/app/entity/announcement';
import { Profile } from 'src/app/entity/profile';
import { AdminServiceService } from 'src/app/service/admin-service.service';
import { AnnouncementServiceService } from 'src/app/service/announcement-service.service';
import { LoginService } from 'src/app/service/login.service';
import { StudentService } from 'src/app/service/student.service';
import { WebsocketServiceDiscussionFormService } from 'src/app/service/websocket-service-discussion-form-service.service';

@Component({
  selector: 'app-profile-bar',
  templateUrl: './profile-bar.component.html',
  styleUrls: ['./profile-bar.component.scss']
})

export class ProfileBarComponent implements OnInit {
  profileData: Profile = new Profile();
  totalNotifications = 0;
  role: string = ''

  constructor(private studentService: StudentService,
    private loginService: LoginService,
    private adminService: AdminServiceService,
    private announcementService: AnnouncementServiceService, private webSocketService: WebsocketServiceDiscussionFormService) {
  }

  ngOnInit(): void {

    if (this.loginService.getRole() == 'STUDENT') {
      this.role = 'STUDENT'
      this.profileData = this.studentService.getStudentHeaderProfileData();
      this.getAllUnseenNotificationCount();
    } else if (this.loginService.getRole() == 'ADMIN') {
      this.role = 'ADMIN'
      this.profileData = this.adminService.getAdminProfileData()
    }
    this.connect()
  }
  // public connect() {
  //   this.webSocketService.getMessages().subscribe((message) => {
  //     if (message.type == 'announcement') {
  //       this.totalNotifications += 1
  //     }
  //   });
  // }

  Coursestatus: boolean = false;
  public connect() {
    this.webSocketService.getMessages().subscribe((message) => {
      if (message.type == 'announcement') {
        let newObject = new Announcement(message.title, message.message, message.date);
        this.getStudentCourse(message.allCourse).then(() => {
          if (this.Coursestatus) {
            this.Coursestatus = false;
            this.totalNotifications += 1
          }
        });
      } else if (message.type == 'reloadAnnouncement') {
        this.getAllUnseenNotificationCount()
      }
    });
  }

  public async getStudentCourse(course: number[]): Promise<void> {
    let courseId = 0;
    const data: any = await this.studentService.getByStudentById(this.loginService.getStudentId()).toPromise();
    courseId = data.courseResponse.courseId;
    this.Coursestatus = course.includes(courseId);
  }

  public getAllUnseenNotificationCount() {
    this.announcementService.countUnseenNotificationForStudent(this.loginService.getStudentId()).subscribe({
      next: (data: any) => {
        this.totalNotifications = data
      },
      error: (err: any) => {
      }
    })
  }

}


