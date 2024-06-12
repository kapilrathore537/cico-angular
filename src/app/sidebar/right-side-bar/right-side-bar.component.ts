// import { Announcement } from './../../entity/announcement';
// import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
// import { Profile } from 'src/app/entity/profile';
// import { AdminServiceService } from 'src/app/service/admin-service.service';
// import { AnnouncementServiceService } from 'src/app/service/announcement-service.service';
// import { LoginService } from 'src/app/service/login.service';
// import { StudentService } from 'src/app/service/student.service';
// import { UtilityServiceService } from 'src/app/service/utility-service.service';
// import { WebsocketServiceDiscussionFormService } from 'src/app/service/websocket-service-discussion-form-service.service';

// @Component({
//   selector: 'app-right-side-bar',
//   templateUrl: './right-side-bar.component.html',
//   styleUrls: ['./right-side-bar.component.scss'],
// })
// export class RightSideBarComponent implements OnInit, AfterViewInit, OnDestroy {

//   profileData: Profile = new Profile();
//   readMessage = false;
//   messageNo = 0;
//   timeline: string = '';
//   messageTopic: any;
//   Coursestatus: Boolean = false
//   announcements: Announcement[] = [];
//   unseenNotification = 0;
//   announcementsVisibility: boolean[] = [false]
//   isDataReloading: Boolean = false
//   messages: boolean = false
//   constructor(private studentService: StudentService,
//     public utilityService: UtilityServiceService,
//     private loginService: LoginService,
//     private adminService: AdminServiceService,
//     private annoucementService: AnnouncementServiceService, private websocketService: WebsocketServiceDiscussionFormService) { }
//   ngOnDestroy(): void {
//     this.messageTopic.unsubscribe();
//   }

//   ngOnInit(): void {

//   }

//   ngAfterViewInit(): void {
//     if (this.loginService.getRole() == 'STUDENT') {
//       this.profileData = this.studentService.getStudentHeaderProfileData();
//       this.getAnnouncementsForStudents();
//     } else if (this.loginService.getRole() == 'ADMIN') {
//       this.profileData = this.adminService.getAdminProfileData()
//     }
//     this.connect();
//   }

//   public getAnnouncementsForStudents() {

//     this.isDataReloading = true
//     this.annoucementService.getAnnouncementForStudent(this.loginService.getStudentId()).subscribe({
//       next: (data: any) => {

//         this.announcements = data;
//         if (this.announcements) {
//           this.unseenNotification = this.announcements.length
//           this.isDataReloading = false
//           if (this.announcements.length == 0) {
//             this.messages = true
//           } else {
//             this.messages = false
//           }
//         }

//       },
//       error: (err: any) => {
//         this.isDataReloading = false
//       }
//     })
//   }

//   public seenMessage(msgNo: number, announcementId: number) {
//     this.messageNo = msgNo;
//     let index = 0;
//     if (this.announcementsVisibility[msgNo]) {
//       this.announcementsVisibility[msgNo] = false
//     } else {
//       this.announcementsVisibility[msgNo] = true
//       this.announcementsVisibility.forEach(obj => {
//         if (index !== msgNo) {
//           this.announcementsVisibility[index] = false
//         }
//         index++;
//       })
//     }

//     this.readMessage = !this.readMessage;
//     this.annoucementService.seenMassageByStudent(announcementId, this.loginService.getStudentId()).subscribe({
//       next: (data: any) => {
//         this.websocketService.sendMessage({ type: 'reloadAnnouncement' })
//       },
//       error: (err: any) => {
//       }
//     })
//   }

//   public connect() {
//     this.messageTopic = this.websocketService.getMessages().subscribe((message) => {
//       if (message.type == 'announcement') {
//         let newObject = new Announcement(message.title, message.message, message.date);
//         this.getStudentCourse(message.allCourse).then(() => {
//           if (this.Coursestatus) {
//             this.messages = false
//             this.Coursestatus = false;
//             if (this.announcements[0].message != newObject.message)
//               this.announcements.unshift(newObject);
//           }
//         });
//       }
//     });
//   }

//   public async getStudentCourse(course: number[]): Promise<void> {
//     let courseId = 0;
//     const data: any = await this.studentService.getByStudentById(this.loginService.getStudentId()).toPromise();
//     courseId = data.courseResponse.courseId;
//     this.Coursestatus = course.includes(courseId);
//   }

//   clearMessage() {
//     this.announcements = []
//   }
// }
import { Announcement } from './../../entity/announcement';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { log } from 'console';
import { Profile } from 'src/app/entity/profile';
import { AdminServiceService } from 'src/app/service/admin-service.service';
import { AnnouncementServiceService } from 'src/app/service/announcement-service.service';
import { LoginService } from 'src/app/service/login.service';
import { StudentService } from 'src/app/service/student.service';
import { UtilityServiceService } from 'src/app/service/utility-service.service';
import { WebsocketServiceDiscussionFormService } from 'src/app/service/websocket-service-discussion-form-service.service';

@Component({
  selector: 'app-right-side-bar',
  templateUrl: './right-side-bar.component.html',
  styleUrls: ['./right-side-bar.component.scss'],
})
export class RightSideBarComponent implements OnInit, AfterViewInit {

  profileData: Profile = new Profile();
  readMessage = false;
  messageNo = 0;
  timeline: string = '';
  Coursestatus: Boolean = false
  announcements: Announcement[] = [];
  unseenNotification = 0;
  announcementsVisibility: boolean[] = [false]
  isDataReloading: Boolean = false
  messages: boolean = false
  constructor(private studentService: StudentService,
    public utilityService: UtilityServiceService,
    private loginService: LoginService,
    private adminService: AdminServiceService,
    private annoucementService: AnnouncementServiceService, private websocketService: WebsocketServiceDiscussionFormService) { }

  ngOnInit(): void {

    this.connect()
  }

  ngAfterViewInit(): void {
    if (this.loginService.getRole() == 'STUDENT') {
      this.profileData = this.studentService.getStudentHeaderProfileData();
      this.getAnnouncementsForStudents();
    } else if (this.loginService.getRole() == 'ADMIN') {
      this.profileData = this.adminService.getAdminProfileData()
    }
  }

  public getAnnouncementsForStudents() {

    this.isDataReloading = true
    this.annoucementService.getAnnouncementForStudent(this.loginService.getStudentId()).subscribe({
      next: (data: any) => {
        setTimeout(() => {
          this.announcements = data;
          if (this.announcements) {
            this.unseenNotification = this.announcements.length
          }
          this.isDataReloading = false
          if (this.announcements.length == 0) {
            this.messages = true
          } else {
            this.messages = false
          }
        }, 300);
      },
      error: (err: any) => {
        this.isDataReloading = false
      }
    })
  }

  public seenMessage(msgNo: number, announcementId: number) {
    this.messageNo = msgNo;
    let index = 0;
    if (this.announcementsVisibility[msgNo]) {
      this.announcementsVisibility[msgNo] = false
    } else {
      this.announcementsVisibility[msgNo] = true
      this.announcementsVisibility.forEach(obj => {
        if (index !== msgNo) {
          this.announcementsVisibility[index] = false
        }
        index++;
      })
    }

    this.readMessage = !this.readMessage;
    this.annoucementService.seenMassageByStudent(announcementId, this.loginService.getStudentId()).subscribe({
      next: (data: any) => {
        this.websocketService.sendMessage({ type: 'reloadAnnouncement' })
      },
      error: (err: any) => {
      }
    })
  }

  // public connect() {
  //   this.websocketService.getMessages().subscribe((message) => {
  //     if (message.type == 'announcement') {
  //       let newObject = new Announcement(message.title, message.message, message.date);
  //       this.getStudentCourse(message.allCourse).then(() => {
  //         if (this.Coursestatus) {
  //           this.messages = false
  //           this.Coursestatus = false;
  //           this.announcements.unshift(newObject);
  //         }
  //       });
  //     }
  //   });
  // }
  public connect() {
    this.websocketService.getMessages().subscribe((message) => {
      if (message.type == 'announcement') {
        let newObject = new Announcement(message.title, message.message, message.date);
        this.getStudentCourse(message.allCourse).then(() => {
          if (this.Coursestatus) {
            this.messages = false
            this.Coursestatus = false;

            // Check if the announcement is already in the list
            if (!this.isDuplicate(newObject)) {
              console.log(newObject);
              
              this.announcements.unshift(newObject);
            }
          }
        });
      }
    });
  }

  // Helper function to check for duplicates
  private isDuplicate(newAnnouncement: any) {
    return this.announcements.some(announcement =>
      announcement.title === newAnnouncement.title &&
      announcement.message === newAnnouncement.message &&
      announcement.date === newAnnouncement.date &&
      announcement.announcementId === newAnnouncement.announcementId
    );
  }


  public async getStudentCourse(course: number[]): Promise<void> {
    let courseId = 0;
    const data: any = await this.studentService.getByStudentById(this.loginService.getStudentId()).toPromise();
    courseId = data.courseResponse.courseId;
    this.Coursestatus = course.includes(courseId);
  }

  clearMessage() {
    this.announcements = []
  }
}
