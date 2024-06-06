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
  mp: Map<number, string> = new Map
  showDiv: boolean[] = []; // Array to track visibility of divs

  constructor(private announcementService: AnnouncementServiceService) {
    this.announcements
  }

  ngOnInit(): void {
    this.getAllPublishedAnnouncement(0, 10);
  }
  public getAllPublishedAnnouncement(page: number, size: number) {
    this.announcementService.getAllPublishedAnnouncement(page, size).subscribe({
      next: (data: any) => {
        this.announcements = data;
        this.announcements.forEach(() => {
          this.showDiv.push(false); // Initially hide all divs
      });
      },
      error: (err: any) => {
        console.log('error');
      }
    })
  }

    toggleDiv(index: number) {
        // Toggle visibility of div for the clicked announcement
        this.showDiv[index] = !this.showDiv[index];
    }

    hasContent(obj: any, index: number): boolean {
      // Check if there is content to show in the div
      return obj.courseName.length>1;
    }

    showMoreLessText(index: number): string {
      // Return appropriate text based on visibility status
      return this.showDiv[index] ? "- less" : "+ more";
  }
}
