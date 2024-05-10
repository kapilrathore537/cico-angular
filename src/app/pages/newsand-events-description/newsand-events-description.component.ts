import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsAndEvent } from 'src/app/entity/news-and-event';
import { NewsEventServiceService } from 'src/app/service/news-event-service.service';
import { UtilityServiceService } from 'src/app/service/utility-service.service';

@Component({
  selector: 'app-newsand-events-description',
  templateUrl: './newsand-events-description.component.html',
  styleUrls: ['./newsand-events-description.component.scss']
})
export class NewsandEventsDescriptionComponent implements OnInit {

  newsAndEvents: NewsAndEvent = new NewsAndEvent
  totalNewsAndEvent: number = 0;
  id: number = 0
  createdDate: Date | undefined


  constructor(private activatedRoute: ActivatedRoute, private newsAndEventService: NewsEventServiceService, public utilityService: UtilityServiceService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params[('id')]
    this.newsAndEventService.getByNewsById(this.id).subscribe({
      next: (data: any) => {
        this.newsAndEvents = data
      }
    })
  }


  // getDaysDifference(): number {
  //   const currentDate = new Date();
  //   const differenceInTime = currentDate.getTime() - this.createdDate.getTime();
  //   const differenceInDays = differenceInTime / (1000 * 3600 * 24); // Convert milliseconds to days
  //   return Math.floor(differenceInDays); // Round down to the nearest integer
  // }
}
