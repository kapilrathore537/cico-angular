import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Announcement } from 'src/app/entity/announcement';
import { AnnouncementServiceService } from 'src/app/service/announcement-service.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent implements OnInit {

  public announcements: Announcement[] = []
  all: string[] = []
  visibilityStatus!: string
  mp: Map<number, string> = new Map

  constructor(private announcementService: AnnouncementServiceService) {
    this.announcements
    this.visibilityStatus = ''
  }

  ngOnInit(): void {
    this.getAllPublishedAnnouncement(0, 10);
  }
  public getAllPublishedAnnouncement(page: number, size: number) {
    this.announcementService.getAllPublishedAnnouncement(page, size).subscribe({
      next: (data: any) => {
        this.announcements = data;
        this.visibilityStatus = 'showMore'
        this.fillData(this.announcements);
        //  this.showMore()
      },
      error: (err: any) => {
        console.log('error');
      }
    })
  }

  public fillData(data: any) {
    let count = 0;
    data.filter((obj: any) => {
      this.all[count] = obj.courseName[0];
      // map.put()
      count += 1
    });
  }
  public showMore(id: any) {

    // if (this.visibilityStatus == 'showMore') {
    //  // alert('showMore')
    //   this.visibilityStatus = 'showLess'
    //   this.all = this.announcements.courseName[0];
    //   console.log(this.announcements.courseName);
    //   console.log(this.all);
    // } else if (this.visibilityStatus == 'showLess') {
    // //  alert('showLess')
    //   this.visibilityStatus = 'showMore'
    //   this.all = this.announcements.courseName
    //   console.log(this.announcements.courseName);

    //   }
  }
}
